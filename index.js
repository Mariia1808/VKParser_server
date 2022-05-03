//access_token=1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352
//expires_in=86400
//user_id=50064646

require('dotenv').config()
const express = require('express')


const axios = require("axios");
let token = '1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352'
const PORT = process.env.PORT || 5000

const app = express()

const login = async () => {
    const {data} = await axios.post('https://api.vk.com/method/groups.getById?v=5.131&fields=members_count&group_id=queenspublic&access_token='+token)
    const test = JSON.stringify(data.response)
    console.log(data.response[0].members_count)
    return data
}

const start = async () =>{
    try{
        login()
        app.listen(PORT, ()=>console.log(PORT))
    } catch (e) { 
        console.log(e)
    }

}
start()


