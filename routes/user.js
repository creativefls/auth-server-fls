const router = require('express').Router();

let userController = require('../controllers/userController');

// akan dipanggil dengan route /api/users/blablabla
router.get('/', userController.index)
router.patch('/:id/roles', userController.updateRole)
router.patch('/:id/info', userController.updateInfo)

module.exports = router;
