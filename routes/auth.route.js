const { Router } = require('express');

const AuthController = require('../controllers/AuthController');
const userValidator = require('./../validators/userValidator')
const router = Router();

router.post('/login', AuthController.login);
router.post('/register',userValidator, AuthController.register);
router.post('/logout', AuthController.logout);

module.exports = router;