require('dotenv').config()
const axios = require('axios')
const { History, User } = require('../models/models');

class MainController { 
    async create(req, res){
        const {name, id} = req.params
        const {itog} = req.body
        const history = await History.create({itog:itog, zapros:name, userID:id})
        return res.json({"response":"no_error"})
    }
    async get(req, res){
        const {id} = req.params
        const user = await User.findOne({where:{ user_id: id}})
        const history_user = await History.findAndCountAll({where:{ userID: user.ID}})
        return res.json(history_user)
    }

    async delete(req, res){
        const {id} = req.params
        const history = await History.destroy({where:{id: id}})
        return res.json(history)
    }

}

module.exports = new MainController()