require('dotenv').config()
const axios = require('axios')


class OtherController {   
    //преобразование короткого имени
    async resolveScreenName(req, res) {
        const {user_id, token} = req.params
        console.log(user_id)
        const names = String(user_id).split(',')
        console.log(names)
        const arr = []
        for(let i in names){
            console.log(names[i])
            const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+names[i])
            arr.push(data.response)
        }
        //const {data} = await axios.post('https://api.vk.com/method/utils.resolveScreenName?v=5.131&access_token='+token+'&screen_name='+user_id)
       
        return res.json(arr)
    }
    //список стран
    async getCountries(req, res) {
        const {token} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/database.getCountries?v=5.131&count=234&access_token='+token+'&need_all=1')
        console.log(data)
        return res.json(data)
    }
    //список регионов
    async getRegions(req, res) {
        const {country_id, token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getRegions?v=5.131&access_token='+token+'&country_id='+country_id)
        console.log(data)
        return res.json(data)
    }
    
    //список городов
    async getCities(req, res) {
        const {country_id, region_id, token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getCities?v=5.131&access_token='+token+'&country_id='+country_id+'&region_id='+region_id+'&need_all=0&count=1000')
        let count = data.response.count
        //console.log(data.response.count)
        let kolvo = count%1000
        let offset = 0
        let arr =[]
        //console.log(kolvo)
        while(offset <= count){
            const {data} = await (await axios.post('https://api.vk.com/method/database.getCities?v=5.131&access_token='+token+'&country_id='+country_id+'&region_id='+region_id+'&count='+Number(kolvo)+'&offset='+Math.round(offset)))
            if(data.response !== undefined){
                for(var te in data.response.items)
                {
                    arr.push(data.response.items[te])
                }
            }
            offset = offset+kolvo
            kolvo = 1000
        }  
        console.log(arr.length)
        return res.json(arr)
    }
    //список университетов
    async getUniversities(req, res) {
        const {country_id, city_id, token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getUniversities?v=5.131&access_token='+token+'&country_id='+country_id+'&city_id='+city_id )
        console.log(data)
        return res.json(data)
    }
    //список факультетов
    async getFaculties(req, res) {
        const {university_id, token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getFaculties?v=5.131&access_token='+token+'&university_id='+university_id )
        console.log(data)
        return res.json(data)
    }
    //сокращенные ссылки
    async getLastShortenedLink(req, res) {
        const {token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/utils.getLastShortenedLinks?v=5.131&access_token='+token+'&need_all=1')
        console.log(data)
        return res.json(data)
    }

    //получение страны
    async getCountriesById(req, res) {
        const {country, token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/database.getCountriesById?v=5.131&access_token='+token+'&country_ids='+country)
        console.log(data)
        return res.json(data)
    }

    //получение города
    async getCitiesById(req, res) {
        const {city, token} = req.params
        console.log(city)
        const {data} = await axios.post('https://api.vk.com/method/database.getCitiesById?v=5.131&access_token='+token+'&city_ids='+city)
        console.log(data)
        return res.json(data)
    }
}

module.exports = new OtherController()