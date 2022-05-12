const express = require('./services/express')
const routes = require('./routes')
const db = require("./models");

const PORT = 8080

const server = express(routes)

db.sequelizeInstance.sync()

server.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`)
})
