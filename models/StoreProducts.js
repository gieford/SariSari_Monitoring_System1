const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'storeproducts',
  {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    storeId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    price: {
      type: Sequelize.FLOAT
    },
    count: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
