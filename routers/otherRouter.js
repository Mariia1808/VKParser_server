const Router = require('express')
const OtherController = require('../controllers/OtherController')
const router = new Router()

router.post('/:user_id', OtherController.resolveScreenName)
router.post('/country/:token', OtherController.getCountries)
router.post('/:country_id', OtherController.getRegions)
router.post('/:country_id/:region_id', OtherController.getCities)
router.post('/:region_id/:city_id', OtherController.getUniversities)
router.post('/:university_id', OtherController.getFaculties)
router.post('/short_link', OtherController.getLastShortenedLink)

module.exports = router