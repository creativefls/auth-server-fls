const router = require('express').Router();

const checkAdmin = require('../middleware/authAdminMiddleware')
let userController = require('../controllers/userController');

// akan dipanggil dengan route /api/users/blablabla
router.get('/', userController.index)
router.patch('/:id/roles', checkAdmin, userController.updateRole)
router.patch('/:id/info', checkAdmin, userController.updateInfo)

module.exports = router;
