const express = require('express');
const router = express.Router();
const checkRegisterEmailVaild = require('../../middlewares/checkEmail');
const { signUp, login } = require('../../controllers/user');

router.post('/signup', checkRegisterEmailVaild, signUp);
router.post('/login', login);

module.exports = router;
