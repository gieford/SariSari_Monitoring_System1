const express = require('express')
const userauths = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')


const UserAuth = require('../models/UserAuths')
const Auth = require('../models/Auths')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
userauths.post('/register', (req, res) => {

  const userauthData = {
    authId: req.body.newauthId,
    userId: req.body.newuserId
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have a permission
      UserAuth.findOne({
        where: {
          authId: req.body.newauthId,
          userId: req.body.newuserId
        }
      })
        //TODO bcrypt
        .then(newuserauth => {
          if (!newuserauth) {
            UserAuth.create(userauthData)
              .then(userauth => {
                res.json(true)
              })
              .catch(err => {
                res.send(err)
              })

          } else {
            res.json(null)
          }
        })//then userauth find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})

userauths.get('/viewuserauths', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have a permission
      UserAuth.findAll().then(rows=>
        res.json(rows)
      );
    }else{
      res.json(false)
    }
  })
})

//####################################################################
userauths.delete('/remove',(req,res) =>{

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have a permission
      UserAuth.findOne({
        where:{
          authId: req.body.existauthId,
          userId: req.body.existuserId
        }
      })
      .then(euserauth=>{
        if(euserauth){
            UserAuth.destroy({
              where:{
                authId: req.body.existauthId,
                userId: req.body.existuserId
              }
            }).then(auth => {
                res.json(true);
            })
            .catch(err => {
              res.send(err)
            })
        }else{
          res.send(null);
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

//####################################################################
userauths.delete('/remove1_5',(req,res) =>{

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have a permission
      UserAuth.findOne({
        where:{
          userId: req.body.existuserId
        }
      })
      .then(euserauth=>{
        if(euserauth){
            UserAuth.destroy({
              where:{
                userId: req.body.existuserId
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

//####################################################################
userauths.delete('/remove2',(req,res) =>{

      UserAuth.findOne({
        where:{
          userId: req.body.existuserId
        }
      })
      .then(euserauth=>{
        if(euserauth){
            UserAuth.destroy({
              where:{
                userId: req.body.existuserId
              }
            }).then(auth => {
                res.json(true);
            })
            .catch(err => {
              res.send(err)
            })
        }else{
          res.send(null);
        }

      })
      .catch(err=>{
        res.send(err)
      })
})
//#############################################################
userauths.post('/userauthinfos',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have a permission
      Auth.hasMany(UserAuth,{foreignKey:'authId'})
        Auth.findAll({
          include: [{
            model: UserAuth,
            where: {userId: req.body.userId}
          }]
        }).then(user=>{
    //      res.json(user.userauths.authId)
            res.json(user)
        })
        .catch(err=>{
          res.send(err)
        })
    }else{
        res.json(false)
    }

  })
})


module.exports = userauths
