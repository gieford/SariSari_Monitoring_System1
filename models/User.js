const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM,
      values: ['superadmin','user','admin','disabled','storeowner', 'storeuser']
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    storeId: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
