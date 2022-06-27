const Router = require('express')
const groupsController = require('../controllers/groupsController')

const router = new Router()

router.post('/get_members/:token/:group_id/:fields/:filter', setTimeout('12h'), groupsController.getMembers)
router.post('/get_info/:token/:group_id/:fields', groupsController.getById)
router.post('/get_catalog_info/:token/', groupsController.getCatalogInfo)
router.post('/get_catalog/:token/:category_id/:subcategory_id', groupsController.getCatalog)
router.post('/searchGroup/:token/:q/:type/:sort', groupsController.searchGroup)
router.post('/searchEvent/:token/:q/:city_id/:sort', groupsController.searchEvent)
//router.post('/:name/:id', groupsController.create)

module.exports = router