const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/routes.js')(app)

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`)
})
