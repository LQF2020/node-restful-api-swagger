const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../../db/model/user');

describe('Model - User', function () {
    let savedUser;
    const userInfo = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@mail-xxxx-server.com',
        password: 'test'
    };
    beforeEach(async function () {
        const user = User(userInfo);
        savedUser = await user.save();
    });
    afterEach(async function () {
        await mongoose.connection.db.dropCollection('users');
    });
    describe('User', function () {
        it('should have properties _id, email and password', function () {
            expect(savedUser).to.have.property('_id');
            expect(savedUser).to.have.property('email');
            expect(savedUser).to.have.property('password');
        });
        it('should have stored correct email and password', function () {
            expect(savedUser).to.have.property('_id').equal(userInfo._id);
            expect(savedUser).to.have.property('email').equal(userInfo.email);
            expect(savedUser).to.have.property('password').equal(userInfo.password);
        });
    });
});
