const router = require('express').Router();

const checkAdmin = require('../middleware/authAdminMiddleware')
let userController = require('../controllers/userController');

// akan dipanggil dengan route /api/users/blablabla
router.get('/', checkAdmin, userController.index)
router.get('/:id', checkAdmin, userController.findOne)
router.put('/:id/roles', checkAdmin, userController.updateRole)
router.put('/:id/info', checkAdmin, userController.updateInfo)

module.exports = router;
