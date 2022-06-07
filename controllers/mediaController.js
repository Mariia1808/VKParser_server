require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class MediaController { 
    async getInfoPhoto(req, res) {
        const {token, photos} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/photos.getById?v=5.131&access_token='+token+'&extended=1&photos='+photos)
        console.log(data)
        return res.json(data)
    }
    async getInfoVideo(req, res) {
        const {token, owner_id, videos} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/video.get?v=5.131&access_token='+token+'&extended=1&owner_id='+owner_id+'&videos='+videos)
        console.log(data)
        return res.json(data)
    }
    async getInfoAlbomVideo(req, res) {
        const {token, photos} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/photos.getById?v=5.131&access_token='+token+'&extended=1&photos='+photos)
        console.log(data)
        return res.json(data)
    }
}

module.exports = new MediaController()