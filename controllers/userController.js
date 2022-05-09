require('dotenv').config()
const axios = require('axios')
const ApiError = require('../error/ApiError');


let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'
let t = 'activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,'+
'can_see_audio,can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,'+
'crop_photo,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_200,'+
'photo_200_orig,photo_400_orig,photo_50,sex,site,schools,screen_name,status,verified,games,interests,is_favorite,is_friend,'+
'is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,'+
'photo_max,photo_max_orig,quotes,relation,relatives,timezone,tv,universities'

class UserController {    
    //получение подписок пользователя Сбор подписок людей
    async getSubscriptions(req, res) {
        console.log(req.params)
        const {token, user_id} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/users.getSubscriptions?v=5.131&access_token='+token+'&user_id='+user_id+'&fields=user,group')
        console.log(data)
        return res.json(data)
    }
    
    //Полная информация о пользователях
    async get(req, res) {
        const {token, user_id} = req.params
        console.log(req.params)
        const {data} = await axios.post('https://api.vk.com/method/users.get?access_token='+token+'fields='+t+'user_id='+user_id)
        return res.json(data)
    }

    async login(req, res) {
        const {code} = req.params
        console.log(req.params)
        console.log(code)
        const {data} = await axios.get('https://oauth.vk.com/access_token?scope = offline&client_id=8143523&client_secret=R2fWuaiDSn7WI1CcrYa1&redirect_uri=http://localhost:3000/auth&code='+code)
        console.log(data)
        return res.json(data)
    }
}

module.exports = new UserController()