var express = require('express');
var router = express.Router();

const { csrfProtection } = require('../middleware/authMiddleware')

/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  res.render('index', { title: 'Aku Muda', csrfToken: req.csrfToken() });
});

module.exports = router;
