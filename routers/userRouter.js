const Router = require('express')
const groupsController = require('../controllers/groupsController')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/', groupsController.getById)

module.exports = router