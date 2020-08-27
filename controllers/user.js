const mongoose = require('mongoose');
const User = require('../db/model/user');

const userController = {
    signUp(req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password
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
