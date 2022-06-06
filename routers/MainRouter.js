const Router = require('express')
const mainController = require('../controllers/mainController')
const router = new Router()

router.post('/:name/:id', mainController.create)

module.exports = router