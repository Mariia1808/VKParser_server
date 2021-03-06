const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/login/:code', userController.login)
router.get('/getUser/:token/:user_id', userController.getUser)
router.get('/check', userController.check)
router.get('/getSub/:token/:user_id/:fields', userController.getSubscriptions)
router.get('/get_info_user/:token/:user_id/:fields', userController.get)
router.get('/get_followers/:token/:user_id/:fields', userController.getFollewers)
router.post('/searchUserSchool/:token/:q/:sort/:fields/:sex/:age_from/:age_to/:group_id/:from_list/:school/:school_year', userController.searchUserSchool)
router.post('/searchUserUniversity/:token/:q/:sort/:fields/:sex/:age_from/:age_to/:group_id/:from_list/:university/:university_year/:university_faculty', userController.searchUserUniversity)
router.post('/searchUserWork/:token/:q/:sort/:fields/:city/:sex/:age_from/:age_to/:group_id/:from_list/:company/:position', userController.searchUserWork)
router.post('/searchUserAll/:token/:q/:sort/:fields/:city/:sex/:status/:age_from/:age_to/:birth_day/:birth_month/:birth_year/:group_id/:from_list', userController.searchUserAll)
module.exports = router