require('dotenv').config()
const axios = require('axios')
const ApiError = require('../error/ApiError');



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'
let arr = []

class GroupsController {    
    //Все подписчики групп
    async getMembers(req,res) {
        const {data} = await axios.post('https://api.vk.com/method/groups.getById?'+osnova+'&fields=members_count&group_id=itumor')
        //console.log(data)
        let count = data.response[0].members_count
        let ostatok = count%1000
        let kolvo = ostatok
        while(kolvo <= data.response[0].members_count){
            const {data} = await(await axios.post('https://api.vk.com/method/groups.getMembers?'+osnova+'&count=1000&offset='+Math.round(kolvo)+'&group_id=itumor&sort=id_asc'))
            //console.log(data)
            if(data.response != undefined){
                for(var te in data.response.items)
                {
                    arr.push(data.response.items[te])
                }
            }
            kolvo = kolvo+1000
        }  
        //console.log(arr)
        console.log(res)
        return arr
    }
    async getById(req, res) {
        const {data} = await axios.post('https://api.vk.com/method/groups.getById?'+osnova+'&fields='+
        'activity, ban_info, can_post,can_see_all_posts,city,contacts,counters,country,cover,'+
        'description,finish_date,fixed_post,links,market,members_count,place,site,start_date,status,verified,wiki_page'+
        '&group_id=itumor')
        console.log(data)
        var test = {datas: data.response}
        console.log(test)
        return res.json(data)
        
    }

    

}

module.exports = new GroupsController()