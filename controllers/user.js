const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../db/model/user');
const saltRound = 10;

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
                            if (matched) res.status(401).json({ msg: 'Login Success.' });
                            else res.status(401).json({ msg: 'Login failed.' });
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
