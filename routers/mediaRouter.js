const Router = require('express')
const MediaController = require('../controllers/MediaController')
const router = new Router()

router.post('/getInfoPhoto/:photos/:token', MediaController.getInfoPhoto)

module.exports = router