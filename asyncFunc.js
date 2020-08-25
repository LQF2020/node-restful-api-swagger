const saveProduct = function (product) {
    console.log('Saving product...');
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const savedProduct = product;
            savedProduct.status = 'saved';
            resolve(savedProduct);
        }, 3000);
    });
};

// (function main() {
// 	var product = { name: "Nike 2000", price: "30" };
// 	var savedProduct;
// 	saveProduct(product)
// 		.then((res) => {
// 			savedProduct = res;
// 			console.log(savedProduct);
// 		})
// 		.catch((err) => console.log(err));
// })();

(async function main() {
    const product = {
        name: 'Nike 2000',
        price: '30',
    };
    const savedProduct = await saveProduct(product);
    console.log(savedProduct);
})();
