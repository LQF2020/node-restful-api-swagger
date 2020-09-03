const User = require('../db/model/user');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}
const checkRegisterEmailVaild = (req, res, next) => {
    if (validateEmail(req.body.email)) {
        User.findOne({ email: req.body.email })
            .exec()
            .then((existUser) => {
                if (existUser && existUser.isRegistered) {
                    res.status(409).json({ msg: 'This email has been taken.' });
                } else {
                    next();
                }
            })
            .catch((e) => res.status(500).json({ error: e }));
    } else {
        res.status(404).json({ msg: 'This is not an correct email format.' });
    }
};

module.exports = checkRegisterEmailVaild;
