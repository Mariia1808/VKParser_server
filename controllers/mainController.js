require('dotenv').config()
const axios = require('axios')
const { History, User, Methods, Parameter } = require('../models/models');

class MainController { 
    async create(req, res){
        const {name, id, method, parameters_value} = req.params
        console.log(parameters_value)
        const {itog} = req.body
        const history = await History.create({itog:itog, zapros:name, userID:id})
        Parameter.create({parameters:parameters_value, methodID:method, historyId: history.id})
        return res.json({"response":"no_error"})
        
        
    }
    async get(req, res){
        const {id} = req.params
        const user = await User.findOne({where:{ user_id: id}})
        const history_user = History.findAndCountAll({where:{ userID: user.ID}})
        console.log(history_user.rows)
        if(history_user.count!==0){
            const arr=[]
            const result = []
            const parameter = []
            for (let i in history_user.rows){
                const param = Parameter.findOne({where:{historyId:history_user.rows[i].id}})
                parameter.push(param)
                const {dataValues} = Methods.findOne({where:{ ID:param.methodID}})
                arr.push(dataValues)
            }
            //console.log(arr)
            result.push(history_user.count)
            result.push(history_user.rows)
            result.push(arr)
            result.push(parameter)
            console.log(result)
            return res.json(result)
        }
        //console.log(arr)
        //return res.json(history_user)
    }

    async getMethod(req, res){
        const {id} = req.params
        const method = await Methods.findOne({where:{ ID: id}})
        return res.json(method)
    }

    async delete(req, res){
        const {id} = req.params
        const par = await Parameter.destroy({where:{historyId:id}})
        const history = await History.destroy({where:{id: id}})
        return res.json(history)
    }

}

module.exports = new MainController()