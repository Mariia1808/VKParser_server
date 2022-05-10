require('dotenv').config()
const axios = require('axios')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');


let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'
let t = 'activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,'+
'can_see_audio,can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,'+
'crop_photo,domain,education,exports,followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,photo_200,'+
'photo_200_orig,photo_400_orig,photo_50,sex,site,schools,screen_name,status,verified,games,interests,is_favorite,is_friend,'+
'is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,'+
'photo_max,photo_max_orig,quotes,relation,relatives,timezone,tv,universities'

const generateJwt = (id, token, user_id) => {
    return jwt.sign(
        {id, token, user_id}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


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

        const email = data.email
        const hashToken = await bcrypt.hash(data.access_token, 5)

        const candidate = await User.findOne({where:{email}})
        if (candidate){
            const user = await ( await (User.findOne({where: {email}},
            ))).update({token: data.access_token},)
            console.log(user)
            const token = generateJwt(user.ID, user.token, user.user_id)
            return res.json({token})
        }
        
        const user = await User.create({token: data.access_token, user_id: data.user_id, email: data.email})
        const token = generateJwt(user.ID,  user.token, user.user_id)
        return res.json({token})
    }
    
    async check(req, res){
        const token = generateJwt(req.user.id, req.user.token, req.user.user_id)
        return res.json({token})
    }
    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where:{id}}
        )
        return res.json(user)
    }
}

module.exports = new UserController()