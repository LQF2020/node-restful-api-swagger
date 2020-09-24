const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const app = require('../../../app');
const client = request(app);

const { JWT_SECRET } = process.env;

const createToken = () => {
    const payLoad = {
        email: 'test@mail-xxxx-server.com'
    };
    const config = { expiresIn: '1h' };

    return jwt.sign(payLoad, JWT_SECRET, config);
};

describe('API - /products', function () {
    let createdProductID;
    const expectedProduct = {
        name: 'product TEST',
        price: 99.99,
        imgURL: 'test/asset/sample_test.jpg'
    };
    const BEARER_TEST_TOKEN = createToken();
    after(async function () {
        await mongoose.connection.db.dropCollection('products');
    });
    describe('Create product', function () {
        it('should create product with expected product info', function (done) {
            client
                .post('/products')
                .set('Authorization', `bearer ${BEARER_TEST_TOKEN}`)
                .field('name', expectedProduct.name)
                .field('price', expectedProduct.price)
                .attach('productImage', expectedProduct.imgURL)
                .set('Accept', 'application/json')
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    const { createdProduct } = res.body;
                    expect(res.body).to.have.property('msg');
                    expect(res.body).to.have.property('createdProduct');
                    expect(createdProduct).to.have.property('_id');
                    expect(createdProduct).to.have.property('name').equal(expectedProduct.name);
                    expect(createdProduct).to.have.property('price').equal(expectedProduct.price);
                    expect(createdProduct.imgURL)
                        .to.be.a('string')
                        .and.satisfy((msg) => msg.endsWith('sample_test.jpg'));
                    const imgUploadedPath = path.join(
                        __dirname,
                        '../../../',
                        'uploads',
                        createdProduct.imgURL.split('/').pop()
                    );
                    expect(fs.existsSync(imgUploadedPath)).equal(true);
                    expect(createdProduct).to.have.property('request');
                    createdProductID = createdProduct._id;
                    fs.unlinkSync(imgUploadedPath);
                    done();
                });
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client
                .post('/products')
                .field('name', expectedProduct.name)
                .field('price', expectedProduct.price)
                .attach('productImage', expectedProduct.imgURL)
                .set('Accept', 'application/json')
                .expect(
                    401,
                    {
                        msg: 'Auth failed because of an missing token or invalid token received.'
                    },
                    done
                );
        });
    });
    describe('Get product', function () {
        it('should get product with expected product ID', function (done) {
            client
                .get(`/products/${createdProductID}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const gotProduct = res.body;
                    expect(gotProduct).to.have.property('_id').eql(createdProductID);
                    expect(gotProduct).to.have.property('name').equal(expectedProduct.name);
                    expect(gotProduct).to.have.property('price').equal(expectedProduct.price);
                    expect(gotProduct.imgURL)
                        .to.be.a('string')
                        .and.satisfy((msg) => msg.endsWith('sample_test.jpg'));

                    done();
                });
        });
    });
    describe('Get all products', function () {
        it('should get all existing products', function (done) {
            client
                .get('/products')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const result = res.body;
                    expect(result.count).to.be.a('number');
                    expect(result.products).to.be.a('array');
                    if (result.products.length >= 1) {
                        expect(result.products[0]).to.have.property('_id');
                        expect(result.products[0]).to.have.property('name');
                        expect(result.products[0]).to.have.property('price');
                        expect(result.products[0]).to.have.property('imgURL');
                        expect(result.products[0]).to.have.property('request');
                    }
                });
            done();
        });
    });
    describe('Update product', function () {
        const updateOpts = { name: 'test 2 product', price: 200 };
        it('should update product as expected', function (done) {
            client
                .patch(`/products/${createdProductID}`)
                .set('Authorization', `bearer ${BEARER_TEST_TOKEN}`)
                .send(updateOpts)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const result = res.body;
                    expect(result).to.have.property('msg');
                    expect(result).to.have.property('request');
                    done();
                });
        });
        it('should get correct product with updated info by productID', function (done) {
            client
                .get(`/products/${createdProductID}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const gotProduct = res.body;
                    expect(gotProduct).to.have.property('_id').eql(createdProductID);
                    expect(gotProduct).to.have.property('name').equal(updateOpts.name);
                    expect(gotProduct).to.have.property('price').equal(updateOpts.price);
                    expect(gotProduct.imgURL)
                        .to.be.a('string')
                        .and.satisfy((msg) => msg.endsWith('sample_test.jpg'));

                    done();
                });
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client
                .patch(`/products/${createdProductID}`)
                .send(updateOpts)
                .set('Accept', 'application/json')
                .expect(
                    401,
                    {
                        msg: 'Auth failed because of an missing token or invalid token received.'
                    },
                    done
                );
        });
    });
    describe('Delete product', function () {
        it('should delete product with given product ID', function (done) {
            client
                .delete(`/products/${createdProductID}`)
                .set('Authorization', `bearer ${BEARER_TEST_TOKEN}`)
                .set('Accept', 'application/json')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const result = res.body;
                    expect(result).to.have.property('msg');
                    expect(result).to.have.property('request');
                    done();
                });
        });

        it('should not be able to get the deleted product', function (done) {
            client.get(`/products/${createdProductID}`).set('Accept', 'application/json').expect(
                404,
                {
                    msg: 'No valid entry found.'
                },
                done
            );
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client.delete(`/products/${createdProductID}`).set('Accept', 'application/json').expect(
                401,
                {
                    msg: 'Auth failed because of an missing token or invalid token received.'
                },
                done
            );
        });
    });
});
