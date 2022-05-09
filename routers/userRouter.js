const Router = require('express')
const groupsController = require('../controllers/groupsController')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/:code', userController.login)
router.get('/getSub/:token/:user_id', userController.getSubscriptions)

module.exports = router