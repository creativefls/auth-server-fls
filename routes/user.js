const router = require('express').Router();

let userController = require('../controllers/userController');

// akan dipanggil dengan route /api/user/blablabla
router.get('/all', userController.index)

module.exports = router;
