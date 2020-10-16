const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'roleauths',
  {
    authId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    role: {
      type: Sequelize.ENUM,
      values: ['superadmin','user','admin','disabled','storeowner', 'storeuser']
    }
  },
  {
    timestamps: false
  }
)
