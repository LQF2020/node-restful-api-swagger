const mongoose = require('mongoose');
const { expect } = require('chai');
const Order = require('../../../db/model/order');

describe('Model - Order', function () {
    let savedOrder;
    const orderInfo = {
        _id: new mongoose.Types.ObjectId(),
        productID: new mongoose.Types.ObjectId(),
        quantity: 10
    };
    beforeEach(async function () {
        const order = Order(orderInfo);
        savedOrder = await order.save();
    });
    afterEach(async function () {
        await mongoose.connection.db.dropCollection('orders');
    });
    describe('Get order', function () {
        it('should get a correct order by _id', async function () {
            const gotOrder = await Order.findOne({ _id: orderInfo._id });
            expect(gotOrder).to.have.property('_id').eql(orderInfo._id);
            expect(gotOrder).to.have.property('productID').eql(orderInfo.productID);
            expect(gotOrder).to.have.property('quantity').equal(orderInfo.quantity);
        });
    });
    describe('Create order', function () {
        it('should have properties _id, productID, quantity', function () {
            expect(savedOrder).to.have.property('_id');
            expect(savedOrder).to.have.property('productID');
            expect(savedOrder).to.have.property('quantity');
        });
        it('should have stored correct _id, productID, quantity', function () {
            expect(savedOrder).to.have.property('_id').eql(orderInfo._id);
            expect(savedOrder).to.have.property('productID').eql(orderInfo.productID);
            expect(savedOrder).to.have.property('quantity').equal(orderInfo.quantity);
        });
    });
    describe('Update order', async function () {
        it('should have updated productID and quantity as expected', async function () {
            const updatedOps = { productID: new mongoose.Types.ObjectId(), quantity: 99 };
            await Order.updateOne({ _id: savedOrder._id }, { $set: updatedOps });
            const updatedorder = await Order.findOne({ _id: savedOrder._id });
            expect(updatedorder).to.have.property('productID').eql(updatedOps.productID);
            expect(updatedorder).to.have.property('quantity').equal(updatedOps.quantity);
        });
    });
    describe('Delete order', async function () {
        it('should have been deleted successfully', async function () {
            expect(savedOrder).to.have.property('_id');
            expect(savedOrder).to.have.property('productID');
            expect(savedOrder).to.have.property('quantity');
            await Order.deleteOne({ _id: savedOrder._id });
            const resultorder = await Order.findOne({ _id: savedOrder._id });
            expect(resultorder).equal(null);
        });
    });
});
