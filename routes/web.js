var express = require('express');
var router = express.Router();

let pageController = require('../controllers/pageController.js')

/* GET home page. */
router.get('/', pageController.index);
router.get('/about', pageController.about);

module.exports = router;
