const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'messages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    from: {
      type: Sequelize.STRING,
    },
    to: {
      type: Sequelize.STRING,
    },
    to_role: {
      type: Sequelize.ENUM,
      values: ['superadmin','user','admin','disabled','storeowner', 'storeuser',null]
    },
    content: {
      type: Sequelize.STRING
    },
    date_created: {
      type: Sequelize.DATE,
    },
    read: {
      type: Sequelize.ENUM,
      values: ['true','false']
    }
  },
  {
    timestamps: false
  }
)
