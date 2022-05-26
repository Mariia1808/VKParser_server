const Router = require('express')
const groupsController = require('../controllers/groupsController')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/:code', userController.login)
router.get('/getUser/:token/:user_id', userController.getUser)
router.get('/check', userController.check)
router.get('/getSub/:token/:user_id/:fields', userController.getSubscriptions)
router.get('/get_info_user/:token/:user_id/:fields', userController.get)
router.get('/get_followers/:token/:user_id/:fields', userController.getFollewers)

module.exports = router