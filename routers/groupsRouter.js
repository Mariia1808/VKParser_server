const Router = require('express')
const groupsController = require('../controllers/groupsController')

const router = new Router()

router.post('/get_members/:token/:group_id/:fields/:filter', groupsController.getMembers)
router.post('/get_info/:token/:group_id/:fields', groupsController.getById)
router.post('/get_catalog_info/:token/', groupsController.getCatalogInfo)
router.post('/get_catalog/:token/:category_id/:subcategory_id', groupsController.getCatalog)
//router.post('/:name/:id', groupsController.create)

module.exports = router