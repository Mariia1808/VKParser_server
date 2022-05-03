require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class CommentController {    
     //Сбор комментариев к альбомам
     async getAllComments(req,res) {
        const {data} = await axios.post('https://api.vk.com/method/photos.getAllComments?'+osnova+'&owner_id=-80799846')
        console.log(data.error)
        return data
    }
}

module.exports = new CommentController()