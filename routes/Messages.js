const express = require('express')
const messages = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')


const Message = require('../models/Messages')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key


//####################################################################
messages.post('/getallinboxmessages', (req,res)=>{
  Message.findAll({
    where:{
      to: req.body.userEmail
    }
  }).then(msg=>{
      res.json(msg)
  }).catch(err=>{
    res.send(err)
  })
})

//####################################################################
messages.post('/getallsentboxmessages', (req,res)=>{
  Message.findAll({
    where:{
      from: req.body.userEmail
    }
  }).then(msg=>{
      res.json(msg)
  }).catch(err=>{
    res.send(err)
  })
})
//####################################################################
messages.post('/getunreadmessages', (req,res)=>{
  Message.findAll({
    where:{
      to: req.body.userEmail,
      read: req.body.read
    }
  }).then(msg=>{
      if(msg){
        res.json(msg)
      }else{
        res.json(null)
      }
  }).catch(err=>{
    res.send(err)
  })
})
//####################################################################
messages.post('/getmsginfo', (req,res)=>{

      Message.findOne({
        where:{
          id: req.body.id
        }
      }).then(msg=>{
        if(msg){
          res.json(msg)
        }else{
          res.json(null)
        }
      }).catch(err=>{
        res.send(err)
      })
})

//####################################################################
messages.put('/updateread',(req,res) => {
      Message.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(msg=>{
        if(msg){
          Message.update(
            {
              read: req.body.read
            },
            {
            where:{
              id: req.body.id
            }
          }).then(mymsg => {
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
})


//####################################################################
messages.post('/create', (req, res) => {
  const today = new Date()
  const msgData = {
    from: req.body.from,
    to: req.body.to,
    to_role: req.body.to_role,
    content: req.body.content,
    read: req.body.read,
    date_created: today
  }
  Message.create(msgData)
    .then(msg => {
      res.json(true)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = messages
