const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const app = require('../../../app');
const client = request(app);
const Product = require('../../../db/model/product');
const { JWT_SECRET } = process.env;

const createToken = () => {
    const payLoad = {
        email: 'test@mail-xxxx-server.com'
    };
    const config = { expiresIn: '1h' };

    return jwt.sign(payLoad, JWT_SECRET, config);
};
describe('API - /orders', function () {
    let createdOrderID;
    const expectedOrder = {};
    const BEARER_TEST_TOKEN = createToken();
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'test product',
        price: 99,
        imgURL: `test image url`
    });
    before(function () {
        return product.save().then(function (item) {
            expectedOrder.productID = item._id;
            expectedOrder.quantity = 10;
        });
    });
    after(async function () {
        await mongoose.connection.db.dropCollection('products');
        await mongoose.connection.db.dropCollection('orders');
    });
    describe('Create order', function () {
        it('should create order as expected', function (done) {
            client
                .post('/orders')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${BEARER_TEST_TOKEN}`)
                .send(expectedOrder)
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body } = res;
                    expect(body).to.have.property('msg');
                    expect(body).to.have.property('createdOrder');
                    expect(body.createdOrder).to.have.property('_id');
                    expect(body.createdOrder).to.have.property('request');

                    expect(body.createdOrder)
                        .to.have.property('productID')
                        .equal(expectedOrder.productID.toString());
                    expect(body.createdOrder)
                        .to.have.property('quantity')
                        .equal(expectedOrder.quantity);

                    createdOrderID = body.createdOrder._id;

                    done();
                });
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client.post(`/orders`).set('Accept', 'application/json').send(expectedOrder).expect(
                401,
                {
                    msg: 'Auth failed because of an missing token or invalid token received.'
                },
                done
            );
        });
    });
    describe('Get order', function () {
        it('should get correct order with a given order id', function (done) {
            client
                .get(`/orders/${createdOrderID}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body } = res;
                    expect(body).to.have.property('_id').equal(createdOrderID);
                    expect(body).to.have.property('quantity').equal(expectedOrder.quantity);
                    expect(body)
                        .to.have.property('productID')
                        .equal(expectedOrder.productID.toString());
                    done();
                });
        });
    });
    describe('Get orders', function () {
        it('should get all the existing orders', function (done) {
            client
                .get(`/orders`)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const result = res.body;
                    expect(result.count).to.be.a('number');
                    expect(result.orders).to.be.a('array');
                    if (result.orders.length >= 1) {
                        expect(result.orders[0]).to.have.property('_id');
                        expect(result.orders[0]).to.have.property('productID');
                        expect(result.orders[0]).to.have.property('quantity');
                        expect(result.orders[0]).to.have.property('request');
                    }
                    done();
                });
        });
    });
    describe('Update order', function () {
        const updateOpts = { quantity: 100 };
        it('should update order with as expected', function (done) {
            client
                .patch(`/orders/${createdOrderID}`)
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
        it('should get the order with updated info by orderID', function (done) {
            client
                .get(`/orders/${createdOrderID}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body } = res;
                    expect(body).to.have.property('_id').equal(createdOrderID);
                    expect(body).to.have.property('quantity').equal(updateOpts.quantity);
                    done();
                });
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client
                .patch(`/orders/${createdOrderID}`)
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

    describe('Delete order', function () {
        it('should delete order with given order ID', function (done) {
            client
                .delete(`/orders/${createdOrderID}`)
                .set('Authorization', `bearer ${BEARER_TEST_TOKEN}`)
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
        it('should not be able to get the deleted order', function (done) {
            client.get(`/orders/${createdOrderID}`).set('Accept', 'application/json').expect(
                404,
                {
                    msg: 'No valid entry found.'
                },
                done
            );
        });
        it('should return Auth Failed if no access token provided', function (done) {
            client.delete(`/orders/${createdOrderID}`).set('Accept', 'application/json').expect(
                401,
                {
                    msg: 'Auth failed because of an missing token or invalid token received.'
                },
                done
            );
        });
    });
});
