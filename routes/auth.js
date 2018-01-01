var express = require("express");
var router = express.Router();

let authController = require("../controllers/authController.js");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;
