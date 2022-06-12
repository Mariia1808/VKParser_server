const Router = require('express')
const WallController = require('../controllers/wallController')
const router = new Router()

router.post('/getReposts/:token/:owner_id/:post_id', WallController.getReposts)
router.post('/get/:token/:owner_id/:filter', WallController.get)
router.post('/search/:token/:owner_id/:query', WallController.search)

module.exports = router