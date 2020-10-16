const express = require('express')
const applystoreowners = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')


const ApplyStoreOwner = require('../models/ApplyStoreOwners')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
applystoreowners.post('/register', (req, res) => {
  const storeData = {
    storename: req.body.storename,
    location: req.body.location,
    owner_name: req.body.owner_name,
    email: req.body.email,
    status: req.body.status
  }

  ApplyStoreOwner.findOne({
    where: {
      storename: req.body.storename
    }
  })
    //TODO bcrypt
    .then(applystoreowner => {
      if (!applystoreowner) {
        ApplyStoreOwner.create(storeData)
          .then(applystoreowner => {
            res.json(true)
          })
          .catch(err => {
            res.send(err)
          })

      } else {
        res.json(false)
      }
    })//then applystoreowner find one
    .catch(err => {
      res.send(err)
    })

})

//####################################################################
applystoreowners.get('/viewallstoreownersapplication', (req, res) => {
  ApplyStoreOwner.findAll().then(rows=>
    res.json({storeownersapplicationlists:rows})
  );
})

//###################################################################
applystoreowners.post('/getstoreownersapplication', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right

      ApplyStoreOwner.findOne({
        where:{
          id: req.body.id
        }
      }).then(row=>{
          if(row){
            res.json(row)
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
applystoreowners.post('/viewstoreownersapplication', (req,res)=>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      ApplyStoreOwner.findAll({
          where:{
            status: req.body.status
          }
        }).then(rows=>{
            res.json(rows)
        }).catch(err=>{
          res.send(err)
        })
    }else{
        res.json(false)
    }
  })
})
//####################################################################
applystoreowners.post('/getstore', (req,res)=>{
  ApplyStoreOwner.findOne({
    where:{
      name: req.body.name
    }
  }).then(applystoreowner=>{
    if(applystoreowner){
      res.json({applystoreowner:applystoreowner})
    }else{
      res.send({applystoreowner: null, msg: "ApplyStoreOwner name is not found"})
    }
  }).catch(err=>{
    res.send({msg:err})
  })
})

//####################################################################
applystoreowners.put('/update',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result){  // if u have the right
      ApplyStoreOwner.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(applystoreowner=>{
        if(applystoreowner){
          ApplyStoreOwner.update(
            {
              status: req.body.status
            },
            {
            where:{
              id: req.body.id
            }
          })
            res.json(true)
        }else{
          res.json(null);
        }
      })//then find one applystoreowner
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})

//####################################################################
applystoreowners.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId);

    if (result){
      ApplyStoreOwner.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(applystoreowner=>{
        if(applystoreowner){
            ApplyStoreOwner.destroy({
              where:{
                id: req.body.id
              }
            })
            res.send({id:req.body.id,msg:"Deleted"})
            console.log(' Deleted from back!')
        }else{
          res.send({msg:" ApplyStoreOwner does not exists12"});
          console.log('ApplyStoreOwner does not exists1')
        }

      })// then applystoreowner findone
      .catch(err=>{
        res.send({msg:err})
      })
    }else{
        res.json({ msg: 'You have no rights to update applystoreowners'})
    }
})


module.exports = applystoreowners
