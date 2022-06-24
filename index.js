require('dotenv').config()
const express = require('express')
const axios = require('axios')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const path = require('path')


const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.get('/', (req, res)=>{
    res.status(200).json({message:"work"})
})



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}


start()

