require('dotenv').config()
const axios = require('axios')
const { History } = require('../models/models');

class MainController { 
    async create(req, res){
        const {name, id} = req.params
        const {itog} = req.body
        console.log(req.body)
        //console.log(req)
        console.log(itog)
        console.log(name)
        console.log(id)
        const history = await History.create({itog:itog, zapros:name, userID:id})
        return res.json({"response":"no_error"})
    }
}

module.exports = new MainController()