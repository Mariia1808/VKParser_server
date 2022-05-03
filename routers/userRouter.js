const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/',userController.id)

module.exports = router