const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'orderproducts',
  {
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    storeId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    count: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    isAvailable: {
      type: Sequelize.ENUM,
      values: ['true','false']
    }

  },
  {
    timestamps: false
  }
)
