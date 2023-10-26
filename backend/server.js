const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const db = require('./Models')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

const start = ()=>{
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
}

start()