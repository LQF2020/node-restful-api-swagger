const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/model/user');
const saltRound = 10;
const { JWT_SECRET } = process.env;

const createToken = (user) => {
    const payLoad = {
        email: user.email
    };
    const config = { expiresIn: '1h' };

    return jwt.sign(payLoad, JWT_SECRET, config);
};

const userController = {
    signUp(req, res) {
        bcrypt.hash(req.body.password, saltRound, (err, hash) => {
            if (err) res.status(500).json({ error: err });
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
                .then((createdUser) => {
                    if (createdUser) {
                        res.status(201).json({ msg: 'User created succeeded.' });
                    } else {
                        res.status(404).json({ msg: 'User created failed.' });
                    }
                })
                .catch((e) => res.status(500).json({ error: e }));
        });
    },

    login(req, res) {
        User.findOne({ email: req.body.email })
            .exec()
            .then((storedUser) => {
                if (storedUser) {
                    const userHashPassword = storedUser.password;
                    bcrypt
                        .compare(req.body.password, userHashPassword)
                        .then((matched) => {
                            if (matched) {
                                const token = createToken(storedUser);
                                res.status(401).json({ msg: 'Login Success.', token: token });
                            } else res.status(401).json({ msg: 'Login failed.' });
                        })
                        .catch((e) => res.status(500).json({ error: e }));
                } else {
                    res.status(401).json({ msg: 'This email is not exist.' });
                }
            })
            .catch((e) => res.status(500).json({ error: e }));
    }
};

module.exports = userController;
