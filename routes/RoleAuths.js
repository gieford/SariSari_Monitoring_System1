const express = require('express')
const roleauths = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')

const Auth = require('../models/Auths')
const RoleAuth = require('../models/RoleAuths')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')


const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
roleauths.post('/register', (req, res) => {
  const roleauthData = {
    authId: req.body.roleauthId,
    role: req.body.role
  }
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the permission
      RoleAuth.findOne({
        where: {
          authId: req.body.roleauthId,
          role: req.body.role
        }
      })
        //TODO bcrypt
        .then(roleauth => {
          if (!roleauth) {
            RoleAuth.create(roleauthData)
              .then(roleauth => {
                res.json(true)
              })
              .catch(err => {
                res.send(err)
              })
          } else {
            res.json(null)
          }
        })//then roleauth find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})

//####################################################################
roleauths.post('/getroleauths', (req,res)=>{

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the permission
      RoleAuth.findAll({
        where:{
          role: req.body.role
        }
      }).then(roleauth=>{
          res.json(roleauth)
      }).catch(err=>{
        res.send(err)
      })
    }else{
      res.json(false)
    }
  })
})

//####################################################################
roleauths.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){
      RoleAuth.findOne({
        where:{
          authId: req.body.roleauthId,
          role: req.body.role
        }
      })
      .then(roleauth=>{
        if(roleauth){
            RoleAuth.destroy({
              where:{
                authId: req.body.roleauthId,
                role: req.body.role
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

      })// then roleauth findone
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})

//#############################################################
roleauths.post('/roleauthinfos',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have a permission
      Auth.hasMany(RoleAuth,{foreignKey:'authId'})
        Auth.findAll({
          include: [{
            model: RoleAuth,
            where: {role: req.body.role}
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

module.exports = roleauths
