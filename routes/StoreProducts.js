const express = require('express')
const storeproducts = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')

const Sequelize = require('sequelize')

const StoreProduct = require('../models/StoreProducts')
const Product = require('../models/Products')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')


const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
storeproducts.post('/register', (req, res) => {
  const storeData = {
    productId: req.body.productId,
    storeId: req.body.storeId,
    price: req.body.price,
    count: req.body.count
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the permission
      StoreProduct.findOne({
        where: {
          productId: req.body.productId,
          storeId: req.body.storeId
        }
      })
        //TODO bcrypt
        .then(storeproduct => {
          if (!storeproduct) {
            StoreProduct.create(storeData)
              .then(storeproduct => {
                res.json(true)
              })
              .catch(err => {
                res.send(err)
              })

          } else {
            res.json(null)
          }
        })//then storeproduct find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})

//##################################################
storeproducts.post('/registermodified', (req, res) => {
  const storeData = {
    productId: req.body.productId,
    storeId: req.body.storeId,
    price: req.body.price,
    count: req.body.count
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result && decoded.storeId===req.body.storeId){  // if u have the permission
      StoreProduct.findOne({
        where: {
          productId: req.body.productId,
          storeId: req.body.storeId
        }
      })
        //TODO bcrypt
        .then(storeproduct => {
          if (!storeproduct) {
            StoreProduct.create(storeData)
              .then(storeproduct => {
                res.json(true)
              })
              .catch(err => {
                res.send(err)
              })

          } else {
            StoreProduct.update(
              {
                productId: req.body.productId,
                storeId: req.body.storeId,
                price: req.body.price,
                count: req.body.count
              },
              {
              where:{
                productId: req.body.productId,
                storeId: req.body.storeId
              }
            })
              res.json(true)
          }
        })//then storeproduct find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})
//##################################################

//####################################################################
storeproducts.get('/viewstoreproducts', (req, res) => {
  StoreProduct.findAll().then(rows=>
    res.json({storeproductlists:rows})
  );
})

//####################################################################
storeproducts.post('/getstoreproductinfo', (req,res)=>{
  StoreProduct.findOne({
    where:{
      productId: req.body.productId,
      storeId: req.body.storeId
    }
  }).then(storeproduct=>{
    if(storeproduct){
      res.json({storeproduct:storeproduct})
    }else{
      res.send({storeproduct: null, msg: "StoreProduct name is not found"})
    }
  }).catch(err=>{
    res.send({msg:err})
  })
})

//####################################################################
storeproducts.put('/update',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result && decoded.storeId===req.body.storeId){
      StoreProduct.findOne({
        where:{
          productId: req.body.productId,
          storeId: req.body.storeId
        }
      })
      .then(storeproduct=>{
        if(storeproduct){
          StoreProduct.update(
            {
              productId: req.body.productId,
              storeId: req.body.storeId,
              price: req.body.price,
              count: req.body.count
            },
            {
            where:{
              productId: req.body.productId,
              storeId: req.body.storeId
            }
          })
            res.json(true)
        }else{
          res.json(null)
        }
      })//then find one storeproduct
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})

//####################################################################
storeproducts.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
    if (result && decoded.storeId===req.body.storeId){
      StoreProduct.findOne({
        where:{
          productId: req.body.productId,
          storeId: req.body.storeId
        }
      })
      .then(storeproduct=>{
        if(storeproduct){
            StoreProduct.destroy({
              where:{
                productId: req.body.productId,
                storeId: req.body.storeId
              }
            })
            res.json(true)
        }else{
          res.json(null)
        }

      })// then storeproduct findone
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})
//####################################################################
storeproducts.post('/viewsearchstoreproducts', (req, res) => {

      db.sequelize.query("SELECT `storeproducts`.`productId`, `storeproducts`.`storeId`, `storeproducts`.`price`, `storeproducts`.`count`, `product`.`id` AS `id`, `product`.`name` AS `name`, `product`.`description` AS `product_description` FROM `storeproducts` AS `storeproducts` INNER JOIN `products` AS `product` ON `storeproducts`.`productId` = `product`.`id` where ( `storeproducts`.`storeId` ='"+req.body.storeId+"' AND `product`.`name` like '%"+req.body.searchProductName+"%')",
        {type: Sequelize.QueryTypes.SELECT})
      .then(rows=>
        res.json(rows)
      );

})
//#############################################################
storeproducts.post('/getproductinfos',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  StoreProduct.hasOne(Product,{foreignKey:'id'})
    StoreProduct.findOne({
      include: [{
        model: Product,
        where: {id: req.body.productId
                }
      }],
      where: {
        storeId: req.body.storeId
      }
    }).then(product=>{
//      res.json(user.userauths.authId)
        res.json(product)
    })
    .catch(err=>{
      res.send({msg:err})
    })
  })
  //#############################################################
  storeproducts.post('/getstoreproductlist',(req,res) => {
    //hasOne,hasMany.belongsTo,belongsToMany
    StoreProduct.hasOne(Product,{foreignKey:'id'})
      StoreProduct.findAll({
        include: [{
          model: Product
        }],
        where: {
          storeId: req.body.storeId
        }
      }).then(product=>{
  //      res.json(user.userauths.authId)
          res.json(product)
      })
      .catch(err=>{
        res.send({msg:err})
      })
    })


//#############################################################
storeproducts.post('/getallstoreproduct',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany

  db.sequelize.query("SELECT `storeproducts`.`productId`, `storeproducts`.`storeId`, `storeproducts`.`price`, `storeproducts`.`count`, `product`.`id` AS `id`, `product`.`name` AS `name`, `product`.`description` AS `product_description` FROM `storeproducts` AS `storeproducts` INNER JOIN `products` AS `product` ON `storeproducts`.`productId` = `product`.`id` where `storeproducts`.`storeId` ='"+req.body.storeId+"'",
    {type: Sequelize.QueryTypes.SELECT})
  .then(product=>{
//      res.json(user.userauths.authId)
        res.json(product)
    })
    .catch(err=>{
      res.send({msg:err})
    })
  })



module.exports = storeproducts
