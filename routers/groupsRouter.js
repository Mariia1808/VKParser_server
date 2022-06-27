'use strict';

const ms = require('ms');
const Router = require('express')
const groupsController = require('../controllers/groupsController')

const router = new Router()

function setConnectionTimeout(time) {
    var delay = typeof time === 'string'
      ? ms(time)
      : Number(time || 5000);
  
    return function (req, res, next) {
      res.connection.setTimeout(delay);
      next();
    }
  }

router.post('/get_members/:token/:group_id/:fields/:filter', groupsController.getMembers, setConnectionTimeout('12h'))
router.post('/get_info/:token/:group_id/:fields', groupsController.getById)
router.post('/get_catalog_info/:token/', groupsController.getCatalogInfo)
router.post('/get_catalog/:token/:category_id/:subcategory_id', groupsController.getCatalog)
router.post('/searchGroup/:token/:q/:type/:sort', groupsController.searchGroup)
router.post('/searchEvent/:token/:q/:city_id/:sort', groupsController.searchEvent)
//router.post('/:name/:id', groupsController.create)

module.exports = router