var express = require('express');
var router = express.Router();

let userController = require("../controllers/userController.js");

// akan dipanggil dengan route /api/blablabla
router.get('/user', userController.showMe);

module.exports = router;
