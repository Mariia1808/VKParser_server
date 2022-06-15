require('dotenv').config()
const axios = require('axios')
const ApiError = require('../error/ApiError');



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'
let arr = []

class GroupsController {    
    //Все подписчики групп
    async getMembers(req,res) {
        const {token, group_id, fields, filter} = req.params
        const {data} = await axios.post('https://api.vk.com/method/groups.getById?v=5.131&access_token='+token+'&fields=members_count&group_id='+group_id)
        let i_filter = filter==='null'? '' : `&filter=`+filter
        //console.log(data)
        if(data.response!==undefined){
             let count = data.response[0].members_count
            let kolvo = count%1000
            let offset = 0
            let arr =[]
            while(offset <= count){
                const {data} = await(await axios.post('https://api.vk.com/method/groups.getMembers?v=5.131&access_token='+token+'&count='+Number(kolvo)+'&offset='+Math.round(offset)+'&group_id='+group_id+'&sort=id_asc'+'&fields='+fields+i_filter))
                //console.log(data)
                if(data.response != undefined){
                    
                        arr.push(...data.response.items)
                    
                }else{
                    const {data} = await(await axios.post('https://api.vk.com/method/groups.getMembers?v=5.131&access_token='+token+'&count='+Number(kolvo)+'&offset='+Math.round(offset)+'&group_id='+group_id+'&sort=id_asc'+'&fields='+fields+i_filter))
                    if(data.response != undefined){
                        
                            arr.push(...data.response.items)
                        
                    }
                }
                console.log(arr.length)
                offset = offset+kolvo
                kolvo = 1000
            }  
            //console.log(arr)
            console.log(res)
            return res.json(arr)
        }else{
            let arr=[]
            return res.json(arr)
        }
       
    }
    async getById(req, res) {
        const {token, group_id, fields} = req.params
        const {data} = await axios.post('https://api.vk.com/method/groups.getById?v=5.131&access_token='+token+'&fields='+fields+'&group_ids='+group_id)
        console.log(data)
        return res.json(data)  
    }
    async getCatalogInfo(req, res) {
        const {token} = req.params
        const {data} = await axios.post('https://api.vk.com/method/groups.getCatalogInfo?v=5.131&access_token='+token+'&extended=0&subcategories=1')
        console.log(data)
        return res.json(data)  
    }
    async getCatalog(req, res) {
        const {token, category_id, subcategory_id} = req.params
        const {data} = await axios.post('https://api.vk.com/method/groups.getCatalog?v=5.131&access_token='+token+'&category_id='+category_id)
        console.log(data)
        return res.json(data)  
    }
    async searchGroup(req, res) {
        const {token, q, type, sort} = req.params
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_type = type==='null'? '' : `&type=`+type
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/groups.search?v=5.131&access_token='+token+'&count=1000'+i_q+i_type+i_sort))
        console.log(data)
        return res.json(data)  
    }
    async searchEvent(req, res) {
        const {token, q, city_id, sort} = req.params
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_city_id = city_id==='null'? '' : `&city_id=`+city_id
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/groups.search?v=5.131&access_token='+token+'&type=event&future=1&count=1000'+i_city_id+i_sort+i_q))
        console.log(data)
        return res.json(data)  
    }
}

module.exports = new GroupsController()