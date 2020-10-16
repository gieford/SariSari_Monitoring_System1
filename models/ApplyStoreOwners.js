const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'applystoreowners',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    storename: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    owner_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Accepted','Rejected','Waiting']
    }
  },
  {
    timestamps: false
  }
)
