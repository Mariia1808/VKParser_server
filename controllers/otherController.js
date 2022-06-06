require('dotenv').config()
const axios = require('axios')


class OtherController {   
    //преобразование короткого имени
    async resolveScreenName(req, res) {
        const {user_id} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+user_id)
        console.log(data)
        return res.json(data)
    }
    //список стран
    async getCountries(req, res) {
        const {token} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/database.getCountries?v=5.131&access_token='+token+'&need_all=1')
        console.log(data)
        return res.json(data)
    }
    //список регионов
    async getRegions(req, res) {
        const {token} = req.body
        const {country_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getRegions?v=5.131&access_token='+token+'&country_id='+country_id)
        console.log(data)
        return res.json(data)
    }
    //список городов
    async getCities(req, res) {
        const {token} = req.body
        const {country_id, region_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getCities?v=5.131&access_token='+token+'&country_id='+country_id+'&region_id='+region_id)
        console.log(data)
        return res.json(data)
    }
    //список университетов
    async getUniversities(req, res) {
        const {token} = req.body
        const {country_id, city_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getUniversities?v=5.131&access_token='+token+'&country_id='+country_id+'&city_id='+city_id )
        console.log(data)
        return res.json(data)
    }
    //список факультетов
    async getFaculties(req, res) {
        const {token} = req.body
        const {university_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getFaculties?v=5.131&access_token='+token+'&university_id ='+university_id )
        console.log(data)
        return res.json(data)
    }
    //сокращенные ссылки
    async getLastShortenedLink(req, res) {
        const {token} = req.body
        const {data} = await axios.post('https://api.vk.com/method/utils.getLastShortenedLink?v=5.131&access_token='+token+'&need_all=1')
        console.log(data)
        return res.json(data)
    }
}

module.exports = new OtherController()