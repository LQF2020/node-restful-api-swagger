const express = require('express');
const router = express.Router();
const checkRegisterEmailVaild = require('../../middlewares/checkEmail');
const { emailVerification, signUp, login } = require('../../controllers/user');

router.get('/email-verification', emailVerification);
router.post('/signup', checkRegisterEmailVaild, signUp);
router.post('/login', login);

module.exports = router;
