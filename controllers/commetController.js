require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class CommentController {    
    async getCommentsWall(req, res) {
        const {token, owner_id, post_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/wall.getComments?v=5.131&access_token='+token+'&need_likes=1&extended=1&owner_id='+owner_id+'&post_id='+post_id)
        console.log(data)
        return res.json(data)
    }
    async getCommentsPhotos(req, res) {
        const {token, owner_id, photo_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/photos.getComments?v=5.131&access_token='+token+'&need_likes=1&extended=1&owner_id='+owner_id+'&photo_id='+photo_id)
        console.log(data)
        return res.json(data)
    }
    async getCommentsVideo(req, res) {
        const {token, owner_id, video_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/video.getComments?v=5.131&access_token='+token+'&need_likes=1&extended=1&owner_id='+owner_id+'&video_id='+video_id)
        console.log(data)
        return res.json(data)
    }
}

module.exports = new CommentController()