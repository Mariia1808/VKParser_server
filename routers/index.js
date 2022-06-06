const Router = require('express')
const router = new Router()

const UserRouter = require('./userRouter')
router.use('/user', UserRouter)

const MainRouter = require('./MainRouter')
router.use('/main', MainRouter)

const OtherRouter = require('./otherRouter')
router.use('/other', OtherRouter)




module.exports = router