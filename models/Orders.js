const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'orders',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    fullName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.STRING
    },
    storeId: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending','done','canceled','processed']
    },
    totalprice: {
      type: Sequelize.DOUBLE
    },
    storeuserIdProcess: {
      type: Sequelize.INTEGER
    },
    storeuserIdDeliver: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
