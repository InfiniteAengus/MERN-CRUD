const databaseConfig = require('../config/database_config.js')

const Sequelize = require('sequelize')
const sequelizeInstance = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle,
    },
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelizeInstance

db.items = require('./items.js')(sequelizeInstance, Sequelize)

module.exports = db
