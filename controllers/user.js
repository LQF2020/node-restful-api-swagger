const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/model/user');
const sendVerificationMail = require('../email_verification/verifyEmail');
const saltRound = 10;
const { JWT_SECRET, JWT_EMAIL_SECRET, ENABLE_EMAIL_ADDRESS_VERIFICATION } = process.env;

const createToken = (user) => {
    const payLoad = {
        email: user.email
    };
    const config = { expiresIn: '1h' };
    return jwt.sign(payLoad, JWT_SECRET, config);
};

function shouldVerifyEmail() {
    if (
        process.env.NODE_ENV === 'test' ||
        ENABLE_EMAIL_ADDRESS_VERIFICATION.toLowerCase() !== 'true'
    )
        return false;
    return true;
}

const userController = {
    signUp(req, res) {
        bcrypt.hash(req.body.password, saltRound, (err, hash) => {
            if (err) res.status(500).json({ error: err });
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                isRegistered: !shouldVerifyEmail()
            });
            user.save()
                .then((createdUser) => {
                    if (shouldVerifyEmail()) {
                        sendVerificationMail(req.body.email);
                    }
                    if (createdUser) {
                        const response = {
                            userID: req.body.email,
                            isEmailVerified: !shouldVerifyEmail()
                        };
                        if (shouldVerifyEmail())
                            response.msg = `A verification email has been sent to ${req.body.email}`;
                        res.status(201).json(response);
                    } else {
                        res.status(404).json({ msg: 'User created failed.' });
                    }
                })
                .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
        });
    },

    login(req, res) {
        User.findOne({ email: req.body.email })
            .exec()
            .then((storedUser) => {
                if (storedUser && storedUser.isRegistered) {
                    const userHashPassword = storedUser.password;
                    bcrypt
                        .compare(req.body.password, userHashPassword)
                        .then((matched) => {
                            if (matched) {
                                const token = createToken(storedUser);
                                res.status(200).json({ msg: 'Login Success.', accessToken: token });
                            } else
                                res.status(401).json({
                                    msg: 'Auth failed with an incorrect password.'
                                });
                        })
                        .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
                } else {
                    res.status(404).json({ msg: 'This user account is not found.' });
                }
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    },
    emailVerification(req, res) {
        try {
            const verified = jwt.verify(req.query.verifyToken, JWT_EMAIL_SECRET);
            User.update({ email: verified.email }, { $set: { isRegistered: true } })
                .exec()
                .then((result) => {
                    res.status(200).json({
                        verified: true,
                        email: verified.email
                    });
                })
                .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
        } catch (e) {
            res.status(401).json({ msg: 'Email verification process failed.' });
        }
    }
};

module.exports = userController;
