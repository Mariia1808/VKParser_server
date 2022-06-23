const Router = require('express')
const MediaController = require('../controllers/mediaController')
const router = new Router()

router.post('/getInfoPhoto/:token/:photos', MediaController.getInfoPhoto)
router.post('/getInfoVideo/:token/:owner_id/:album_id', MediaController.getInfoVideo)
router.post('/getAlbumById/:token/:owner_id/:album_id', MediaController.getAlbumById)
router.post('/searchPhoto/:token/:q/:end_time/:sort/:radius', MediaController.searchPhoto)
router.post('/searchVideo/:token/:q/:sort', MediaController.searchVideo)
module.exports = router