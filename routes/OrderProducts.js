const express = require('express')
const orderproducts = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')

const Sequelize = require('sequelize')

const OrderProduct = require('../models/OrderProducts')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key


//####################################################################
orderproducts.post('/create', (req, res) => {
  const orderproductsData = {
    orderId: req.body.orderId,
    productId: req.body.productId,
    storeId: req.body.storeId,
    count: req.body.count,
    price: req.body.price,
    isAvailable: req.body.isAvailable
  }

  OrderProduct.findOne({
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId,
      storeId: req.body.storeId
    }
  })
    //TODO bcrypt
    .then(orderproduct => {
      if(!orderproduct){
        OrderProduct.create(orderproductsData)
          .then(response => {
            res.json(true)
          })
          .catch(err => {
            res.send(err)
          })
      }else{
        res.json(null);
      }
    })//then auth find one
    .catch(err => {
      res.send(err)
    })

})


//####################################################################
orderproducts.post('/getorderproductdata', (req, res) => {

  db.sequelize.query("SELECT `orderproducts`.`orderId`, `orderproducts`.`storeId`, `orderproducts`.`productId`, `orderproducts`.`price`, `orderproducts`.`count`, `orderproducts`.`isAvailable`, `product`.`id` AS `product_id`, `product`.`name` AS `product_name`, `product`.`description` AS `product_description` FROM `orderproducts` AS `orderproducts` INNER JOIN `products` AS `product` ON `orderproducts`.`productId` = `product`.`id` where `orderproducts`.`orderId` ='"+req.body.orderId+"'",
    {type: Sequelize.QueryTypes.SELECT})
  .then(orderproducts=>{
//          console.log(orderproducts);
          res.json(orderproducts)
      })
      .catch(err=>{
        res.send(err)
      })
})


module.exports = orderproducts
