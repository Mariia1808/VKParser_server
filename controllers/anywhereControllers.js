require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class AnywhereController {   
    //короткое имя в id 
    async id(req, res) {
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?'+osnova+'&screen_name=mvbannikova')
        console.log(data)
        return data.response.object_id
    }
}

module.exports = new AnywhereController()