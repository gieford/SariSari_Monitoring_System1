const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'stores',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.STRING
    },
    isdisabled: {
      type: Sequelize.ENUM,
      values: ['true','false']
    }
  },
  {
    timestamps: false
  }
)
