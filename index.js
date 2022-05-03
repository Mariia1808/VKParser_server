require('dotenv').config()
const express = require('express')
const axios = require('axios')
//const sequelize = require('./db')
//const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const path = require('path')
const userController = require('./controllers/userController')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)



let access_token= '40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88' 
let expires_in=0 
let user_id=50064646

let osnova = 'v=5.131&access_token='+access_token
let arr = []


const login = async () => {
    const {data} = await axios.post('https://api.vk.com/method/users.getSubscriptions?'+osnova+'&user_id='+(await id()).response.object_id+'&fields=user,group')
    return data
}

const id = async () => {
    const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?'+osnova+'&screen_name=mvbannikova')
    return data
}

const start = async () => {
    try {
        //const data = await id()
        const data = await userController.login(await userController.id())
        console.log(data)
        //await sequelize.authenticate()
        //await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}


start()

