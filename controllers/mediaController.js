require('dotenv').config()
const axios = require('axios')



let osnova = 'v=5.131&access_token=40c8405468a05586196ce1283ab9309d98724f8a8ab2000be54d8fde617973dfd185c41bdafca17e59b88'


class MediaController { 

    async getInfoPhoto(req, res) {
        const {token, photos} = req.params
        console.log(token)
        const {data} = await axios.post('https://api.vk.com/method/photos.getById?v=5.131&access_token='+token+'&extended=1&photos='+photos)
        console.log(data)
        return res.json(data)
    }

    async getInfoVideo(req, res) {
        const {token, owner_id, album_id} = req.params
        let album = album_id==='null'? '' : `&album_id=`+album_id
        const {data} = await axios.post('https://api.vk.com/method/video.get?v=5.131&access_token='+token+'&owner_id='+owner_id+album)
        console.log(data)
        return res.json(data)
    }
    async getAlbumById(req, res) {
        const {token, owner_id, album_id} = req.params
        console.log(token)
        if(album_id==='null'){
            const {data} = await axios.post('https://api.vk.com/method/video.getAlbums?v=5.131&access_token='+token+'&owner_id='+owner_id+'&extended=1&need_system=1')
            console.log(data)
            return res.json(data)
        }else{
            const {data} = await axios.post('https://api.vk.com/method/video.getAlbumById?v=5.131&access_token='+token+'&owner_id='+owner_id+'&album_id='+album_id)
            console.log(data)
            return res.json(data)
        }   
    }

    async searchVideo(req, res) {
        const {token, q, sort} = req.params
        console.log(token)
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? `` : `&sort=`+sort
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/video.search?v=5.131&count=100&access_token='+token+'&hd=1'+i_sort+i_q))
        console.log(data)
        return res.json(data)
    }

    async searchPhoto(req, res) {
        const {token, q, end_time, sort, radius} = req.params
        console.log(token)
        let i_q = q==='null'? '' : `&q=`+q
        let i_sort = sort==='null'? '' : `&sort=`+sort
        let i_radius = radius==='null'? '' : `&radius=`+radius
        const {data} = await axios.post(encodeURI('https://api.vk.com/method/photos.search?v=5.131&count=1000&access_token='+token+i_sort+i_radius+i_q))
        console.log(data)
        return res.json(data)
    }


    
}

module.exports = new MediaController()