require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class WallController {    

     //статистика групп за весь период 
     async getReposts(req, res) {
        const {token, owner_id, post_id} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/wall.getReposts?v=5.131&access_token='+token+'&owner_id='+owner_id+'&post_id='+post_id)
        console.log(data)
        return res.json(data)
    }
    async get(req, res) {
        const {token, owner_id, filter} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/wall.get?v=5.131&access_token='+token+'&extended=1&owner_id='+owner_id+'&filter='+filter)
        console.log(data)
        return res.json(data)
    }
    async search(req, res) {
        const {token, owner_id, query} = req.params
        console.log(token)
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/wall.search?v=5.131&access_token='+token+'&extended=1&owner_id='+owner_id+'&query='+query))
        console.log(data)
        return res.json(data)
    }
}

module.exports = new WallController()