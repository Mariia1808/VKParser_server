const Router = require('express')
const OtherController = require('../controllers/OtherController')
const router = new Router()

router.post('/resolve/:user_id/:token', OtherController.resolveScreenName)
router.post('/country/:token', OtherController.getCountries)
router.post('/regions/:country_id/:token', OtherController.getRegions)
router.post('/city/:country_id/:region_id/:token', OtherController.getCities)
router.post('/universites/:country_id/:city_id/:token', OtherController.getUniversities)
router.post('/facults/:university_id/:token', OtherController.getFaculties)
router.post('/short_link/:token', OtherController.getLastShortenedLink)

module.exports = router