require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class StatisticController {   
    //список групп
    async getGroups(req, res) {
        const {token} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/groups.get?v=5.131&access_token='+token+'&filter=admin&extended=1')
        console.log(data)
        return res.json(data)
    }
    //статистика групп за весь период 
    async StatsGroupAll(req, res) {
        const {token, group_id} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/stats.get?v=5.131&access_token='+token+'&interval=all&group_id='+group_id)
        console.log(data)
        return res.json(data)
    }
    //статистика приложения за весь период 
    async StatsAppAll(req, res) {
        const {token, app_id} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/stats.get?v=5.131&access_token='+token+'&interval=all&app_id='+app_id)
        console.log(data)
        return res.json(data)
    }
    //статистика групп по датам
    async StatsGroup(req, res) {
        const {token, group_id, timestamp_from, timestamp_to} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/stats.get?v=5.131&access_token='+token+'&interval=month&group_id='+Number(group_id)+'&timestamp_from='+Number(timestamp_from)+'&timestamp_to='+Number(timestamp_to))
        console.log(data)
        return res.json(data)
    }
    //статистика приложений по датам
    async StatsApp(req, res) {
        const {token, app_id, timestamp_from, timestamp_to} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/stats.get?v=5.131&access_token='+token+'&interval=month&app_id='+app_id+'&timestamp_from='+timestamp_from+'&timestamp_to='+timestamp_to)
        console.log(data)
        return res.json(data)
    }
}

module.exports = new StatisticController()