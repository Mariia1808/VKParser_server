const Router = require('express')
const mainController = require('../controllers/mainController')
const router = new Router()

router.post('/save/:name/:id/:method/:parameters_value', mainController.create)
router.post('/history/:id', mainController.get)
router.post('/delete/:id', mainController.delete)
router.post('/getMethod/:id', mainController.getMethod)
router.post('/getAllMethods', mainController.getAllMethods)
router.post('/createMethod/:name', mainController.createMethods)
router.post('/deleteMethods/:id', mainController.deleteMethods)
router.post('/updateMethods/:id/:name', mainController.updateMethods)

module.exports = router