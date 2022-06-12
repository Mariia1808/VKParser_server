const Router = require('express')
const CommetController = require('../controllers/commetController')
const router = new Router()

router.post('/getCommentsWall/:token/:owner_id/:post_id', CommetController.getCommentsWall)
router.post('/getCommentsPhotos/:token/:owner_id/:photo_id', CommetController.getCommentsPhotos)
router.post('/getCommentsVideo/:token/:owner_id/:video_id', CommetController.getCommentsVideo)

module.exports = router