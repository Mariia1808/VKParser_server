require('dotenv').config()
const express = require('express')
const axios = require('axios')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const path = require('path')

const userController = require('./controllers/userController')
const anywhereControllers = require('./controllers/anywhereControllers')
const groupsController = require('./controllers/groupsController')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.post('/', (req, res)=>{
    res.status(200).json({message:"wjrk"})
})


let access_token= '40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88' 
let expires_in=0 
let user_id=50064646

let osnova = 'v=5.131&access_token='+access_token
let arr = []


const start = async () => {
    try {
        //const data = await id()
        // const {data} = await groupsController.getById()
        // console.log('nhbvg'+data)
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}


start()

