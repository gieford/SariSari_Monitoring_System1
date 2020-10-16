const express = require('express')
const auths = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const db = require('../database/db.js')

const Sequelize = require('sequelize')

const Auth = require('../models/Auths')
const UserAuths = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key


//####################################################################
auths.post('/register', (req, res) => {
  const authData = {
    name: req.body.name,
    description: req.body.description
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){ // have permission
      Auth.findOne({
        where: {
          name: req.body.name
        }
      })
        //TODO bcrypt
        .then(auth => {
          if (!auth) {
            Auth.create(authData)
              .then(auth => {
                  res.json(true);
              })
              .catch(err => {
                res.send(err)
              })
          } else {
            res.json(null)
          }
        })//then auth find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})


//####################################################################
auths.post('/getauth', (req,res)=>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){ // have permission
      Auth.findOne({
        where:{
          name: req.body.name
        }
      }).then(auth=>{
        if(auth){
          res.json(auth)
        }else{
          res.json(null)
        }
      }).catch(err=>{
        res.send(err)
      })
    }else{
      res.json(false)
    }
  })
})

//####################################################################
auths.post('/getauthinfos', (req,res)=>{

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Auth.findOne({
        where:{
          id: req.body.id
        }
      }).then(auth=>{
        if(auth){
          res.json(auth)
        }else{
          res.json(null)
        }
      }).catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})
//####################################################################
auths.post('/viewauths', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((cond) => {
  //  console.log(result);
      if (cond){  // if u have the right
        Auth.findAll().then(rows=>
          res.json(rows)
        );
      }else{
          res.json(false)
      }
  });
})

//####################################################################
auths.post('/viewsearchauths', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((cond) => {
  //  console.log(result);
      if (cond){  // if u have the right
        db.sequelize.query("select * from auths a where a.name like '%"+req.body.searchAuthName+"%'",
          {type: Sequelize.QueryTypes.SELECT})////
        .then(rows=>
          res.json(rows)
        );
      }else{
          res.json(false)
      }
  });
})
//####################################################################
auths.put('/update',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      Auth.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(auth=>{
        if(auth){
          Auth.update(
            {
              id: req.body.id,
              name: req.body.name,
              description: req.body.description
            },
            {
            where:{
              id: req.body.id
            }
          }).then(auth => {
              res.json(true);
          })
          .catch(err => {
            res.send(err)
          })
        }else{
          res.json(null);
        }
      })//then find one auth
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})

//####################################################################
auths.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Auth.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(auth=>{
        if(auth){
            Auth.destroy({
              where:{
                id: req.body.id
              }
            }).then(auth => {
                res.json(true);
            })
            .catch(err => {
              res.send(err)
            })
        }else{
          res.json(null);
        }

      })
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})
//#############################################################
auths.post('/viewsearchnotpresentuserauths',(req,res) => {

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      //hasOne,hasMany.belongsTo,belongsToMany
      db.sequelize.query("select * from auths a where (a.id not in (select userauths.authId from userauths where userauths.userId="+req.body.userId+") AND a.name like '%"+req.body.searchAuthName+"%')",
        {type: Sequelize.QueryTypes.SELECT})////
    .then(auth=>{
        res.json(auth);
      }).catch(err=>{
        res.send(err)
      })

    }else{
        res.json(false)
    }

  })
})
//#############################################################
auths.post('/viewsearchnotpresentroleauths',(req,res) => {

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      //hasOne,hasMany.belongsTo,belongsToMany
      db.sequelize.query("select * from auths a where (a.id not in (select roleauths.authId from roleauths where roleauths.role='"+req.body.role+"') AND a.name like '%"+req.body.searchAuthName+"%')",
        {type: Sequelize.QueryTypes.SELECT})////
    .then(auth=>{
        res.json(auth);
      }).catch(err=>{
        res.send(err)
      })

    }else{
        res.json(false)
    }

  })
})
//#############################################################
auths.post('/notpresentinuserauths',(req,res) => {

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      //hasOne,hasMany.belongsTo,belongsToMany
      db.sequelize.query("select * from auths a where a.id not in (select userauths.authId from userauths where userauths.userId="+req.body.userId+")",
        {type: Sequelize.QueryTypes.SELECT})////
    .then(auth=>{
        res.json(auth);
      }).catch(err=>{
        res.send(err)
      })

    }else{
        res.json(false)
    }

  })
})
  //#############################################################
  auths.post('/notpresentinroleauths',(req,res) => {

    var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
    result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
      if (result){  // if u have the right
        //hasOne,hasMany.belongsTo,belongsToMany
        db.sequelize.query("select * from auths a where a.id not in (select roleauths.authId from roleauths where roleauths.role='"+req.body.role+"')",
          {type: Sequelize.QueryTypes.SELECT})////
      .then(auth=>{
          res.json(auth);
        }).catch(err=>{
          res.send(err)
        })

      }else{
          res.json(false)
      }

    })
})


module.exports = auths
