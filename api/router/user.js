const express = require('express');
const router = express.Router();
const checkEmailVaild = require('../../middlewares/checkEmail');
const { signUp, login } = require('../../controllers/user');

router.post('/signUp', checkEmailVaild, signUp);
router.post('/login', login);

module.exports = router;
