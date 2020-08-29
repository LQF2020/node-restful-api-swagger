module.exports = {
    getAllOrders: {
        get: {
            tags: ['Order'],
            summary: 'Get the list of all orders',
            produces: ['application/json'],

            responses: {
                '200': {
                    description: 'Return all the existing orders.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    createOrder: {
        post: {
            tags: ['Order'],
            summary: 'Create a new order',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'productID',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'body',
                    name: 'quantity',
                    required: true,
                    type: 'integer'
                },

                {
                    in: 'query',
                    name: 'token',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                '201': {
                    description: 'order has been successfully created and returned to client.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    getOrderById: {
        get: {
            tags: ['Order'],
            summary: 'Get an existing order',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'orderID',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                '200': {
                    description: 'An existing order will be return.'
                },
                '404': {
                    description: 'No valid entry.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    update_and_delete: {
        patch: {
            tags: ['Order'],
            summary: 'Update an existing order',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'quantity',
                    type: 'integer'
                },
                {
                    in: 'path',
                    name: 'orderID',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'token',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                '200': {
                    description: 'order has been successfully updated.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        },

        delete: {
            tags: ['Order'],
            summary: 'Delete an existing order',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'orderID',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'token',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                '200': {
                    description: 'order has been successfully deleted.'
                },
                '404': {
                    description: 'Order not found.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    }
};
