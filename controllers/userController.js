require('dotenv').config()
const axios = require('axios')

let access_token= '40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88' 
let expires_in=0 
let user_id=50064646

let osnova = 'v=5.131&access_token='+access_token


module.exports =  id = async () => {
    const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?'+osnova+'&screen_name=mvbannikova')
    return data
}

class UserController {    

   async login(id, req, res) {
        const {data} = await axios.post('https://api.vk.com/method/users.getSubscriptions?'+osnova+'&user_id='+id+'&fields=user,group')
        console.log(data)
        return data
    }
    
   async id(req, res) {
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?'+osnova+'&screen_name=mvbannikova')
        return data.response.object_id
    }
}

module.exports = new UserController()