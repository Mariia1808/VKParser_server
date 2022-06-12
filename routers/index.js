const Router = require('express')
const router = new Router()

const UserRouter = require('./userRouter')
router.use('/user', UserRouter)

const MainRouter = require('./MainRouter')
router.use('/main', MainRouter)

const OtherRouter = require('./otherRouter')
router.use('/other', OtherRouter)

const MediaRouter = require('./mediaRouter')
router.use('/media', MediaRouter)

const GroupRouter = require('./groupsRouter')
router.use('/group', GroupRouter)

const StatisticRouter = require('./statisticRouter')
router.use('/static', StatisticRouter)

const WallRouter = require('./wallRouter')
router.use('/wall', WallRouter)

const CommentRouter = require('./commentRouter')
router.use('/comment', CommentRouter)

module.exports = router