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
        const {token, user_id, fields} = req.params
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+user_id)
        const id = data.response.object_id
        if(id!=null){
            const {data} = await axios.post('https://api.vk.com/method/users.getSubscriptions?v=5.131&extended=1&count=100&access_token='+token+'&user_id='+id+'&fields='+fields)
            console.log(data)
            return res.json(data)
        }
    }
    
      // информация о пользователе
    async getUser(req, res) {
        console.log(req.params)
        const {token, user_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/users.get?v=5.131&access_token='+token+'&user_id='+user_id)
        return res.json(data)
    }

    //Полная информация о пользователях
    async get(req, res) {
        const {token, user_id, fields} = req.params
        const {data} = await axios.post('https://api.vk.com/method/users.get?v=5.131&access_token='+token+'&fields='+fields+'&user_id='+user_id)
        return res.json(data)
    }

    //Подписчики
    async getFollewers(req, res) {
        const {token, user_id, fields} = req.params
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+user_id)
        const id = data.response.object_id
        if(id!=null){
           const {data} = await axios.post('https://api.vk.com/method/users.getFollowers?v=5.131&offset=0&count=500&access_token='+token+'&fields='+fields+'&user_id='+id)
            return res.json(data) 
        }
        
    }

    async id(req, res) {
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+user_id)
        console.log(data)
        return data.response.object_id
    }

    async login(req, res) {
        const {code} = req.params
        console.log(req.params)
        console.log(code)
        const {data} = await axios.get('https://oauth.vk.com/access_token?scope=offline&client_id=8143523&client_secret=R2fWuaiDSn7WI1CcrYa1&redirect_uri=http://localhost:3000/main&code='+code)
        console.log(data)

        const user_id = data.user_id
        const hashToken = await bcrypt.hash(data.access_token, 5)

        const candidate = await User.findOne({where:{user_id:user_id}})
        if (candidate){
            const user = await ( await (User.findOne({where: {user_id:user_id}},
            ))).update({token: data.access_token},)
            console.log(user)
            const token = generateJwt(user.ID, user.token, user.user_id)
            return res.json({token})
        }
        
        const user = await User.create({token: data.access_token, user_id: data.user_id, email: data.email})
        const token = generateJwt(user.ID,  user.token, user.user_id)
        return res.json(token)
    }
    
    async check(req, res){
        console.log(req)
        const token = generateJwt(req.user.token, req.user.user_id)
        return res.json({token})
    }
    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where:{id}}
        )
        return res.json(user)
    }
    async searchUserSchool(req, res) {
        const {token, q, sort, fields, sex, age_from, age_to, group_id, from_list, school, school_year} = req.params
        let i_sex = sex==='null'? '' : `&sex=`+sex
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_age_from = age_from==='null'? '' : `&age_from=`+age_from
        let i_age_to = age_to==='null'? '' : `&age_to=`+age_to
        let i_group_id = group_id==='null'? '' : `&group_id=`+group_id
        let i_from_list = from_list==='null'? '' : `&from_list=`+from_list

        let i_school = school==='null'? '' : `&school=`+school
        let i_school_year = school_year==='null'? '' : `&school_year=`+school_year

        const {data} = await axios.post(encodeURI('https://api.vk.com/method/users.search?v=5.131&count=1000&access_token='+token+'&fields='+fields+i_q+i_sex+i_age_from+i_age_to+i_group_id+i_from_list+i_school+i_school_year+i_sort+i_q))
        console.log(data)
        return res.json(data)
    }
    async searchUserUniversity(req, res) {
        const {token, q, sort, fields, sex, age_from, age_to, group_id, from_list, university, university_year, university_faculty} = req.params
        let i_q = q==='null'? '' : `&q=`+q
        let i_sex = sex==='null'? '' : `&sex=`+sex
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_age_from = age_from==='null'? '' : `&age_from=`+age_from
        let i_age_to = age_to==='null'? '' : `&age_to=`+age_to
        let i_group_id = group_id==='null'? '' : `&group_id=`+group_id
        let i_from_list = from_list==='null'? '' : `&from_list=`+from_list

        let i_university = university==='null'? '' : `&university=`+university
        let i_university_year = university_year==='null'? '' : `&university_year=`+university_year
        let i_university_faculty = university_faculty==='null'? '' : `&university_faculty=`+university_faculty
        
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/users.search?v=5.131&count=1000&access_token='+token+'&fields='+fields+i_q+i_sex+i_age_from+i_age_to+i_group_id+i_from_list+i_university+i_university_faculty+i_university_year+i_sort))
        console.log(data)
        return res.json(data)
    }
    async searchUserWork(req, res) {
        const {token, q, sort, fields, city, sex, age_from, age_to, group_id, from_list, company, position} = req.params
        let i_city = city==='null'? '' : `&city=`+city
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_sex = sex==='null'? '' : `&sex=`+sex
        let i_age_from = age_from==='null'? '' : `&age_from=`+age_from
        let i_age_to = age_to==='null'? '' : `&age_to=`+age_to
        let i_group_id = group_id==='null'? '' : `&group_id=`+group_id
        let i_from_list = from_list==='null'? '' : `&from_list=`+from_list

        let i_company = company==='null'? '' : `&company=`+company
        let i_position = position==='null'? '' : `&position=`+position

        const {data} = await axios.post(encodeURI('https://api.vk.com/method/users.search?v=5.131&count=1000&access_token='+token+'&fields='+fields+i_city+i_sex+i_q+i_age_from+i_age_to+i_group_id+i_from_list+i_company+i_position+i_sort))
        console.log(data)
        return res.json(data)
    }
    async searchUserAll(req, res) {
        const {token, q, sort, fields, city, sex, status, age_from, age_to, birth_day, birth_month, birth_year, group_id, from_list} = req.params
        let i_city = city==='null'? '' : `&city=`+city
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_sex = sex==='null'? '' : `&sex=`+sex
        let i_status = status==='null'? '' : `&status=`+status
        let i_age_from = age_from==='null'? '' : `&age_from=`+age_from
        let i_age_to = age_to==='null'? '' : `&age_to=`+age_to
        let i_birth_day = birth_day==='null'? '' : `&birth_day=`+birth_day
        let i_birth_month = birth_month==='null'? '' : `&birth_month=`+birth_month
        let i_birth_year = birth_year==='null'? '' : `&birth_year=`+birth_year
        let i_group_id = group_id==='null'? '' : `&group_id=`+group_id
        let i_from_list = from_list==='null'? '' : `&from_list=`+from_list
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/users.search?v=5.131&count=1000&access_token='+token+'&fields='+fields+i_city+i_sex+i_status+i_age_from+i_age_to+i_birth_day+i_birth_month+i_birth_year+i_group_id+i_from_list+i_q+i_sort))
        
        console.log(data)
        console.log('https://api.vk.com/method/users.search?v=5.131&count=1000&access_token='+token+'&fields='+fields+i_city+i_sex+i_status+i_age_from+i_age_to+i_birth_day+i_birth_month+i_birth_year+i_group_id+i_from_list+i_q+i_sort)
        
        return res.json(data)
    }
}

module.exports = new UserController()