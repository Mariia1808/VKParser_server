const Router = require('express')
const StatisticController = require('../controllers/statisticController')
const router = new Router()

router.post('/getGroups/:token', StatisticController.getGroups)
router.post('/statsGroupAll/:token/:group_id', StatisticController.StatsGroupAll)
router.post('/statsAppAll/:token/:app_id', StatisticController.StatsAppAll)
router.post('/statsGroup/:token/:group_id/:timestamp_from/:timestamp_to', StatisticController.StatsGroup)
router.post('/statsApp/:token/:app_id/:timestamp_from/:timestamp_to', StatisticController.StatsApp)

module.exports = router