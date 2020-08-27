const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isRegistered: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
