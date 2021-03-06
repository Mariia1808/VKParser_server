require('dotenv').config()
const axios = require('axios')
const { History, User, Methods, Parameter } = require('../models/models');

class MainController { 

    async createMethods(req, res){
        const {name} = req.params
        const {method} = req.body
        const methods = await Methods.create({name:name, method:method})
        return res.json({"response":"no_error"})        
    }

    async getAllMethods(req, res){
        const methods = await Methods.findAndCountAll({order:[['ID', 'ASC']]},)
        return res.json(methods)        
    }

    async updateMethods(req, res){
        const {id, name} = req.params
        const {method} = req.body
        const methods = await ( await (Methods.findOne({where: {ID: id}},
            ))).update({name: name, method: method},)
        return res.json(methods)        
    }

    async deleteMethods(req, res){
        const {id} = req.params
        const methods = await Methods.destroy({where:{ID: id}})
        return res.json(methods)        
    }

    async create(req, res){
        try{
            const {name, id, method, parameters_value} = req.params
            console.log(parameters_value)
            const {itog} = req.body
            const history = await History.create({itog:itog, zapros:name, userID:id})
            let his_param = await Parameter.create({parameters:parameters_value, methodID:method, historyId: history.id})
            return res.json({"response":"no_error"})
        }catch (err){
            console.log(err)
            return res.json({"response":err})
        }
       
    }
    async get(req, res){
        const {id} = req.params
        const user = await User.findOne({where:{ user_id: id}})
        const history_user = await History.findAndCountAll({where:{ userID: user.ID}})
        console.log(history_user.rows)
        if(history_user.count!==0){
            const arr=[]
            const result = []
            const parameter = []
            for (let i in history_user.rows){
                const param = await Parameter.findOne({where:{historyId:history_user.rows[i].id}})
                parameter.push(param)
                console.log(param)
                const {dataValues} = await Methods.findOne({where:{ ID:param.methodID}})
                arr.push(dataValues)
            }
            //console.log(arr)
            result.push(history_user.count)
            result.push(history_user.rows)
            result.push(arr)
            result.push(parameter)
            console.log(result)
            return res.json(result)
        }else{
            return res.json([])
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
        //const par = await Parameter.destroy({where:{historyId:id}})
        const history = await History.destroy({where:{id: id}})
        return res.json(history)
    }

}

module.exports = new MainController()