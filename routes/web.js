var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController.js')

/* GET home page. */
router.get('/', userController.index);

module.exports = router;
