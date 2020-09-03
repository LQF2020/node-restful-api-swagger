const mongoose = require('mongoose');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');
const client = request(app);

describe('/user', function () {
    const signupInfo = {
        email: 'qifu1995@outlook.com',
        password: 'test'
    };
    const invalidEmailSignUp = { email: 'qifu1995outlook.com', password: 'test' };
    const incorrectPasswordLogin = { email: 'qifu1995@outlook.com', password: 'wrong' };
    const notExistEmailLogin = { email: 'qifu1995@isnotExist.com', password: 'wrong' };
    after(async function () {
        await mongoose.connection.db.dropCollection('users');
    });
    describe('POST /singup', function () {
        it('should responds with email verification', function (done) {
            client
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(signupInfo)
                .expect(
                    201,
                    {
                        toVerify: signupInfo.email
                    },
                    done
                );
        });
        it('should responds 409 if email has been taken', function (done) {
            client
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(signupInfo)
                .expect(409, done);
        });
        it('should responds 404 if incorrect email format provided', function (done) {
            client
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(invalidEmailSignUp)
                .expect(404, done);
        });

        describe('POST /login', function () {
            it('should login successfully if correct email and password provided', function (done) {
                client
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send(signupInfo)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) done(err);
                        expect(res.body).to.has.property('msg');
                        expect(res.body).to.has.property('accessToken');
                        done();
                    });
            });
            it('should return 401 Auth failed if incorrect password provided', function (done) {
                client
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send(incorrectPasswordLogin)
                    .expect(401, done);
            });
            it('should return 404 not found error if email is not exist', function (done) {
                client
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send(notExistEmailLogin)
                    .expect(404, done);
            });
        });
    });
});
