const Router = require('express')
const mainController = require('../controllers/mainController')
const router = new Router()

router.post('/save/:name/:id/:method/:parameters_value', mainController.create)
router.post('/history/:id', mainController.get)
router.post('/delete/:id', mainController.delete)
router.post('/getMethod/:id', mainController.getMethod)

module.exports = router