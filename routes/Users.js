const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const serverinit = require('../serverinit')

const db = require('../database/db.js')

const Sequelize = require('sequelize')

const User = require('../models/User')
const UserAuth = require('../models/UserAuths')
const Authenticate = require('./Authenticate/Authenticate')
users.use(cors())

var SECRET_KEY = serverinit.secret_key

//####################################################################
users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json(user.id)
            })
            .catch(err => {
              res.send(err)
            })
        })
      } else {
        res.json(null)
      }
    })
    .catch(err => {
      res.send(err)
    })
})

//########################################################################
//####################################################################
users.post('/registerstoreuser', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      const today = new Date()
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        storeId: req.body.storeId,
        created: today
      }

      User.findOne({
        where: {
          email: req.body.email
        }
      })
        //TODO bcrypt
        .then(user => {
          if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
                .then(user => {
                  res.json(user.id)
                })
                .catch(err => {
                  res.send(err)
                })
            })
          } else {
            res.json(null)
          }
        })
        .catch(err => {
          res.send(err)
        })
      }else{
          res.json(false)
      }
    })
})

//####################################################################
users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, SECRET_KEY, {
            expiresIn: '24h'   //1400= 24mins   24h
          })
          res.json(token)
        }else{
          res.json(false)
        }
      } else {
        //res.status(400).json({ error: 'User does not exist' })
        res.json(null)
      }
    })
    .catch(err => {
      res.send(err)
    })
})

//####################################################################
//####################################################################
users.post('/finduseremail', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        res.json(true)
      } else {
        //res.status(400).json({ error: 'User does not exist' })
        res.json(false)
      }
    })
    .catch(err => {
      res.send(err)
    })
})

//####################################################################
users.post('/profile', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send({msg:"User does not exist"})
      }
    })
    .catch(err => {
      res.send({msg: err})
    })
})


//####################################################################
users.route('/remove').delete(function(req,res) {
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then(user=>{
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          User.destroy({
            where:{
              email: req.body.email
            }
          })
          res.json(true)
        }else{
          res.json(false);
        }
      }else{
        res.json(null);
      }
    })
    .catch(err=>{
      res.send(err)
    })
})


//####################################################################
users.route('/adminremove').delete(function(req,res) {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      User.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(user=>{
        if(user){
            User.destroy({
              where:{
                id: req.body.id
              }
            })
            res.send(true)
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
users.put('/adminupdate',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      User.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(user=>{
        if(user){
                const today = new Date()
                User.update(
                  {
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    storeid: req.body.storeId,
                    created: today
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
      })
      .catch(err=>{
        res.send(err)
      })
    }else{
        res.json(false)
    }
  })
})
//############################################################################
//####################################################################
users.put('/adminupdateuserstoreid',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      User.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(user=>{
        if(user){
                const today = new Date()
                User.update(
                  {
                    storeId: req.body.storeId
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
users.put('/modifystoreuser',(req,res) => {
  const today = new Date()
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result){  // if u have the right
      User.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(user=>{
        if(user){
                const today = new Date()
                User.update(
                  {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    role: req.body.role,
                    storeId: req.body.storeId,
                    created: today
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
users.put('/resetstoreuserpass',(req,res) => {
  const today = new Date()
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {

    if (result && req.body.storeId===decoded.storeId){  // if u have the right
      User.findOne({
        where:{
          id: req.body.id
        }
      })
      .then(user=>{
        if(user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              var newpassword = hash
              const today = new Date()
              User.update(
                {
                  password: newpassword,
                  created: today
                },
                {
                where:{
                  id: req.body.id
                }
              })
                res.json(true)
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
users.put('/update',(req,res) => {
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then(user=>{
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
            var newpassword = hash

              const today = new Date()
              User.update(
                {
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  password: newpassword,
                  created: today
                },
                {
                where:{
                  email: req.body.email
                }
              })
                res.json(true)
          })

        }else{
          res.json(false);
        }
      }else{
        res.json(null);
      }
    })
    .catch(err=>{
      res.send(err)
    })
})
//####################################################################
users.put('/updateuserrole',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
      if (result){
        User.findOne({
          where:{
            email: req.body.email
          }
        })
        .then(user=>{
          if(user){
            const today = new Date()
            User.update(
              {
                role: req.body.role,
                created: today
              },
              {
              where:{
                email: req.body.email
              }
            })
            // return userid to the client for it is needed in the process
            res.json(user.id)
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
users.post('/searchuser',(req,res) => {
    var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
    result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
      if (result){
        User.findOne({
          where:{
            id: req.body.id
          }
        })
        .then(user=>{
          if(user){
              res.json(user)
          }else{
            res.json(null)
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
users.post('/viewusers',(req,res) => {
    var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
    result = Authenticate.authenticate(decoded.id,req.body.authId).then((result) => {
      if (result){
        User.findAll()
        .then(user=>{
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

//####################################################################
users.post('/viewsearchusers', (req, res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((cond) => {
  //  console.log(result);
      if (cond){  // if u have the right
        db.sequelize.query("select * from users u where (u.id ='"+req.body.searchUserName+"' OR u.last_name like '%"+req.body.searchUserName+"%' OR u.role='"+req.body.searchUserName+"')",
          {type: Sequelize.QueryTypes.SELECT})////
        .then(rows=>
          res.json(rows)
        );
      }else{
          res.json(false)
      }
  });
})

//#############################################################
users.post('/hasMany',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  User.hasMany(UserAuth,{foreignKey:'userId'})
    User.findAll({
      include: [{
        model: UserAuth,
        where: {authId: req.body.authId}
      }]
    }).then(user=>{
//      res.json(user.userauths.authId)
        res.json(user)
    })
    .catch(err=>{
      res.send({msg:err})
    })
  })
//#########################################################################
users.post('/hasOne',(req,res) => {
  //hasOne,hasMany.belongsTo,belongsToMany
  User.hasMany(UserAuth,{foreignKey:'userId'})

  User.findAll({
    where:{
      id: req.body.authId
    }
  }).then(user=>{
      const asdf=JSON.parse(JSON.stringify(user))
      res.json(user)
    })
    .catch(err=>{
      res.send({msg:err})
    })
  })

//###############################################################################
users.post('/getallstoreusers',(req,res) => {
  var decoded = jwt.verify(req.body.Authorization, SECRET_KEY)
  Authenticate.authenticate(decoded.id,req.body.authId).then((cond) => {
  //  console.log(result);
      if (cond){  // if u have the right
        db.sequelize.query("select * from users u where u.storeId ='"+req.body.storeId+"'",
          {type: Sequelize.QueryTypes.SELECT})////
        .then(rows=>
          res.json(rows)
        );
      }else{
          res.json(false)
      }
  })
})

module.exports = users
