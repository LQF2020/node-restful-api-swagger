const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../db/model/user');
const saltRound = 10;
const userController = {
    signUp(req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRound)
        });
        user.save()
            .select('-__v')
            .then((createdUser) => {
                if (createdUser) {
                    res.status(201).json(createdUser);
                } else {
                    res.status(404).json({ msg: 'User created failed.' });
                }
            })
            .catch((e) => res.status(500).json({ error: e }));
    },
    login(req, res) {}
};

module.exports = userController;
