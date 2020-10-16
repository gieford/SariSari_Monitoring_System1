const express = require('express')
const products = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db.js')

const Sequelize = require('sequelize')

const Product = require('../models/Products')
const StoreProduct = require('../models/StoreProducts')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')

const serverinit = require('../serverinit')
var SECRET_KEY = serverinit.secret_key

//####################################################################
products.post('/register', (req, res) => {
  const productData = {
    name: req.body.name,
    description: req.body.description
  }

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Product.findOne({
        where: {
          name: req.body.name
        }
      })
        //TODO bcrypt
        .then(product => {
          if (!product) {
            Product.create(productData)
              .then(product => {
                res.json(true)
              })
              .catch(err => {
                res.send(err)
              })
          } else {
            res.json(null)
          }
        })//then product find one
        .catch(err => {
          res.send(err)
        })
    }else{
      res.json(false)
    }
  })
})

//####################################################################
products.post('/viewallproducts', (req, res) => {

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Product.findAll().then(rows=>
        res.json(rows)
      );
    }else{
      res.json(false)
    }
})
})

//####################################################################
products.post('/viewallproductswologin', (req, res) => {
      Product.findAll().then(rows=>
        res.json(rows)
      );
})

//####################################################################
products.post('/getproductinfos', (req,res)=>{

  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Product.findOne({
        where:{
          id: req.body.id
        }
      }).then(prod=>{
        if(prod){
          res.json(prod)
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
products.get('/viewproducts', (req, res) => {
  Product.findAll().then(rows=>
    res.json(rows)
  );
})

//####################################################################
products.post('/viewsearchproducts', (req, res) => {
      db.sequelize.query("select * from products a where a.name like '%"+req.body.searchProductName+"%'",
        {type: Sequelize.QueryTypes.SELECT})////
      .then(rows=>
        res.json(rows)
      );

})
//####################################################################
products.post('/getproduct', (req,res)=>{
  Product.findOne({
    where:{
      name: req.body.name
    }
  }).then(product=>{
    if(product){
      res.json({product:product})
    }else{
      res.send({product: null, msg: "Product name is not found"})
    }
  }).catch(err=>{
    res.send({msg:err})
  })
})
//####################################################################
products.post('/getproductinfoWOauths', (req,res)=>{
  Product.findOne({
    where:{
      id: req.body.id
    }
  }).then(product=>{
    if(product){
      res.json(product)
    }else{
      res.json(null)
    }
  }).catch(err=>{
    res.send(err)
  })
})

//####################################################################
products.put('/update',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Product.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(product=>{
        if(product){
          Product.update(
            {
              id: req.body.id,
              name: req.body.name,
              description: req.body.description
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
products.delete('/remove',(req,res) =>{
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      Product.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(product=>{
        if(product){
            Product.destroy({
              where:{
                id: req.body.id
              }
            })
            res.json(true)
        }else{
          res.json(null)
        }

      })// then product findone
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
    })
})

//#############################################################
products.post('/getOnestoreproductinfosanddesc',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  Product.hasOne(StoreProduct,{foreignKey:'productId'})
    Product.findOne({
      include: [{
        model: StoreProduct,
        where: {productId: req.body.productId,
                storeId: req.body.storeId
                }
      }]
    }).then(product=>{
//      res.json(user.userauths.authId)
        if(product){
          res.json(product)
        }else{
          res.json(null)
        }
    })
    .catch(err=>{
      res.send(err)
    })
  })

  //#############################################################
  products.post('/getManystoreproductinfosanddesc',(req,res) => {
    //hasOne,hasMany.belongsTo,belongsToMany
    Product.hasOne(StoreProduct,{foreignKey:'productId'})
      Product.findAll({
        include: [{
          model: StoreProduct,
          where: {
            storeId: req.body.storeId
          }
        }]
      }).then(products=>{
  //      res.json(user.userauths.authId)
          res.json(products)
      })
      .catch(err=>{
        res.send({msg:err})
      })
    })



//#############################################################
products.post('/getproductnotinstoreproducts',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
      db.sequelize.query("select * from products p where (p.id not in (select storeproducts.productId from storeproducts where storeproducts.storeId="+req.body.storeId+"))",
        {type: Sequelize.QueryTypes.SELECT})////
    .then(prods=>{
        res.json(prods);
      }).catch(err=>{
        res.send(err)
      })
  })



module.exports = products
