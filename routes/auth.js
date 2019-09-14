const router = require('express').Router();

let authController = require('../controllers/authController');

const { parseForm, csrfProtection } = require('../middleware/authMiddleware')

// akan dipanggil dengan route /api/auth/blablabla
router.get('/', authController.pingMe);
router.post('/register', parseForm, csrfProtection, authController.register)
router.post('/create', authController.register)
router.post('/regismany', authController.registMany);
router.post('/login', authController.login)
router.post('/change-password', authController.changePassword)

module.exports = router;
