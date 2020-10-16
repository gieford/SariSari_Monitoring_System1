const express = require('express')
const orders = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')


const Sequelize = require('sequelize')
const Order = require('../models/Orders')
const Store = require('../models/Stores')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key


//####################################################################
orders.post('/create', (req, res) => {
  const today = new Date()
  const orderData = {
    userId: req.body.userId,
    fullName: req.body.fullName,
    address: req.body.address,
    contact: req.body.contact,
    storeId: req.body.storeId,
    status: req.body.status,
    totalprice: req.body.totalprice,
    date: today
  }

  Order.create(orderData)
    .then(order => {
      res.json(order.id)
    })
    .catch(err => {
      res.send(err)
    })
})


//####################################################################
orders.post('/getorderdata', (req, res) => {

    //Order.hasOne(Store,{foreignKey:'id'})
//
  db.sequelize.query("SELECT `orders`.`id`, `orders`.`userId`, `orders`.`fullName`, `orders`.`address`, `orders`.`contact`, `orders`.`storeId`, `orders`.`date`, `orders`.`status`, `orders`.`totalprice`, `orders`.`storeuserIdProcess`, `orders`.`storeuserIdDeliver`, `store`.`id` AS `store_id`, `store`.`name` AS `store_name`, `store`.`location` AS `store_location`, `store`.`owner` AS `store_owner`  FROM `orders` AS `orders` INNER JOIN `stores` AS `store` ON `orders`.`storeId` = `store`.`id` where `orders`.`userId` ='"+req.body.userId+"'",
    {type: Sequelize.QueryTypes.SELECT})
  .then(orders=>{
//          console.log(orders);
          res.json(orders)
      })
      .catch(err=>{
        res.send(err)
      })
})


//####################################################################
orders.post('/getstoreordersdata', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if(result){
      db.sequelize.query("SELECT `orders`.`id`, `orders`.`userId`, `orders`.`fullName`, `orders`.`address`, `orders`.`contact`, `orders`.`storeId`, `orders`.`date`, `orders`.`status`, `orders`.`totalprice`, `orders`.`storeuserIdProcess`, `orders`.`storeuserIdDeliver`, `store`.`id` AS `store_id`, `store`.`name` AS `store_name`, `store`.`location` AS `store_location`, `store`.`owner` AS `store_owner`  FROM `orders` AS `orders` INNER JOIN `stores` AS `store` ON `orders`.`storeId` = `store`.`id` where (`orders`.`storeId` ='"+req.body.storeId+"' AND `orders`.`status` ='"+req.body.status+"')",
        {type: Sequelize.QueryTypes.SELECT})
      .then(orders=>{
  //            console.log(orders);
              res.json(orders)
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
orders.put('/updatestatandprocess',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result && decoded.id===req.body.storeuserIdProcess){  // if u have the right
      Order.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(order=>{
        if(order){
          Order.update(
            {
              status: req.body.status,
              storeuserIdProcess: req.body.storeuserIdProcess
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
      })//then find one product
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
    })
})

//####################################################################
orders.put('/updatestatanddeliver',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result && decoded.id===req.body.storeuserIdDeliver){  // if u have the right
      Order.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(order=>{
        if(order){
          Order.update(
            {
              status: req.body.status,
              storeuserIdDeliver: req.body.storeuserIdDeliver
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
      })//then find one product
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
    })
})

//####################################################################
orders.put('/updatestat',(req,res) => {
    var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)

    if (decoded.id===req.body.userId){  // if u have the right
      Order.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(order=>{
        if(order){
          Order.update(
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
      })//then find one product
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
})


module.exports = orders
