const express = require('express')
const stores = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')


const Store = require('../models/Stores')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
stores.post('/register', (req, res) => {
  const storeData = {
    name: req.body.name,
    location: req.body.location,
    owner: req.body.owner,
    isdisabled: req.body.isdisabled
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the permission
      Store.findOne({
        where: {
          name: req.body.name
        }
      })
        //TODO bcrypt
        .then(store => {
          if (!store) {

            Store.create(storeData)
              .then(store => {
                res.json(store.id)
              })
              .catch(err => {
                res.send(err)
              })

          } else {
            res.json(null)
          }
        })//then store find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})

//####################################################################
stores.get('/viewstores', (req, res) => {
  Store.findAll().then(rows=>
    res.json({storelists:rows})
  );
})

//####################################################################
stores.post('/getallstores', (req, res) => {
  Store.findAll().then(rows=>
    res.json(rows)
  );
})

//####################################################################
stores.post('/getalledstores', (req, res) => {
  Store.findAll({
    where:{
      isdisabled: req.body.isdisabled
    }
  }).then(rows=>
    res.json(rows)
  );
})



//####################################################################
stores.post('/getstore', (req,res)=>{
  Store.findOne({
    where:{
      name: req.body.name
    }
  }).then(store=>{
    if(store){
      res.json({store:store})
    }else{
      res.send({store: null, msg: "Store name is not found"})
    }
  }).catch(err=>{
    res.send({msg:err})
  })
})

//####################################################################
stores.put('/update',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId);

    if (result){
      Store.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(store=>{
        if(store){
          Store.update(
            {
              id: req.body.id,
              name: req.body.name,
              location: req.body.location,
              owner: req.body.owner
            },
            {
            where:{
              id: req.body.id
            }
          })
            res.json({ status: req.body.id ,msg: 'Updated' })
        }else{
          res.send({msg: "Store does not exist"});
          console.log('Store does not exist')
        }
      })//then find one store
      .catch(err=>{
        res.send('error: '+err)
      })
    }else{
        res.json({ msg: 'You have no rights to update stores'})
    }
})

//####################################################################
stores.put('/updatestatus',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){
      Store.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(store=>{
        if(store){
          Store.update(
            {
              id: req.body.id,
              isdisabled: req.body.isdisabled
            },
            {
            where:{
              id: req.body.id
            }
          })
            res.json(true)
        }else{
          res.send(null);
        }
      })//then find one store
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})


//####################################################################
stores.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId);

    if (result){
      Store.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(store=>{
        if(store){
            Store.destroy({
              where:{
                id: req.body.id
              }
            })
            res.send({id:req.body.id,msg:"Deleted"})
            console.log(' Deleted from back!')
        }else{
          res.send({msg:" Store does not exists12"});
          console.log('Store does not exists1')
        }

      })// then store findone
      .catch(err=>{
        res.send({msg:err})
      })
    }else{
        res.json({ msg: 'You have no rights to update stores'})
    }
})


module.exports = stores
