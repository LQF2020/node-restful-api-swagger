const mongoose = require('mongoose');
const { expect } = require('chai');
const Product = require('../../../db/model/product');

describe('Model - Product', function () {
    let savedProduct;
    const productInfo = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Nikes 270',
        price: 89.99,
        imgURL: 'product image url of Nike 270'
    };
    beforeEach(async function () {
        const product = Product(productInfo);
        savedProduct = await product.save();
    });
    afterEach(async function () {
        await mongoose.connection.db.dropCollection('products');
    });
    describe('Get product', function () {
        it('should get a correct product by _id', async function () {
            const gotProduct = await Product.findOne({ _id: productInfo._id });
            expect(gotProduct).to.have.property('_id').eql(productInfo._id);
            expect(gotProduct).to.have.property('name').equal(productInfo.name);
            expect(gotProduct).to.have.property('price').equal(productInfo.price);
            expect(gotProduct).to.have.property('imgURL').equal(productInfo.imgURL);
        });
    });
    describe('Create product', function () {
        it('should have properties _id, name, price, imgURL', function () {
            expect(savedProduct).to.have.property('_id');
            expect(savedProduct).to.have.property('name');
            expect(savedProduct).to.have.property('price');
            expect(savedProduct).to.have.property('imgURL');
        });
        it('should have stored correct _id, name, price, imgURL', function () {
            expect(savedProduct).to.have.property('_id').equal(productInfo._id);
            expect(savedProduct).to.have.property('name').equal(productInfo.name);
            expect(savedProduct).to.have.property('price').equal(productInfo.price);
            expect(savedProduct).to.have.property('imgURL').equal(productInfo.imgURL);
        });
    });
    describe('Update product', async function () {
        it('should have updated name and price as expected', async function () {
            const updatedOps = { name: 'Nike 280', price: 10 };
            await Product.updateOne({ _id: savedProduct._id }, { $set: updatedOps });
            const updatedProduct = await Product.findOne({ _id: savedProduct._id });
            expect(updatedProduct).to.have.property('name').equal(updatedOps.name);
            expect(updatedProduct).to.have.property('price').equal(updatedOps.price);
        });
    });
    describe('Delete product', async function () {
        it('should have been deleted successfully', async function () {
            expect(savedProduct).to.have.property('_id');
            expect(savedProduct).to.have.property('name');
            expect(savedProduct).to.have.property('price');
            expect(savedProduct).to.have.property('imgURL');
            await Product.deleteOne({ _id: savedProduct._id });
            const resultProduct = await Product.findOne({ _id: savedProduct._id });
            expect(resultProduct).equal(null);
        });
    });
});
