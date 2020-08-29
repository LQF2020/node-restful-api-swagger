module.exports = {
    User: {
        type: 'object',
        properties: {
            email: {
                type: 'string'
            },
            password: {
                type: 'string',
                format: 'password'
            }
        }
    },
    Product: {
        type: 'object',
        properties: {
            price: {
                type: 'integer'
            },
            name: {
                type: 'string'
            },
            imgURL: {
                type: 'string'
            }
        }
    },
    Products: {}
};
