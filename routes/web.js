var express = require('express');
var router = express.Router();

let homeController = require('../controllers/homeController.js')

/* GET home page. */
router.get('/', homeController.index);
router.get('/about', homeController.about);

module.exports = router;
