const Router = require('express')
const groupsController = require('../controllers/groupsController')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/', userController.get)

module.exports = router