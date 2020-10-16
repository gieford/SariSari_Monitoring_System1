const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'userauths',
  {
    authId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true    }
  },
  {
    timestamps: false
  }
)
