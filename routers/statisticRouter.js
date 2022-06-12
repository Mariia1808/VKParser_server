const Router = require('express')
const StatisticController = require('../controllers/statisticController')
const router = new Router()

router.post('/getGroups/:token', StatisticController.getGroups)
router.post('/statsGroupAll/:token/:group_id', StatisticController.StatsGroupAll)
router.post('/statsAppAll/:token/:app_id', StatisticController.StatsAppAll)
router.post('/getLinkStats/:token/:key', StatisticController.getLinkStats)

module.exports = router