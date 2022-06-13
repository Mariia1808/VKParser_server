const Router = require('express')
const mainController = require('../controllers/mainController')
const router = new Router()

router.post('/save/:name/:id', mainController.create)
router.post('/history/:id', mainController.get)
router.post('/delete/:id', mainController.delete)

module.exports = router