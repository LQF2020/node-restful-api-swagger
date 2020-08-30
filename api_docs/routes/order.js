module.exports = {
    get_post: {
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
        },
        post: {
            tags: ['Order'],
            summary: 'Create a new order',
            produces: ['application/json'],

            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                productID: {
                                    type: 'string'
                                },
                                quantity: {
                                    type: 'integer'
                                }
                            }
                        },
                        required: ['productID', 'quantity']
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '201': {
                    description: 'order has been successfully created and returned to client.'
                },
                '401': {
                    description:
                        'Auth failed because of an missing token or invalid token received.'
                },
                '404': {
                    description: 'Product not exist.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    get_patch_delete: {
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
        },
        patch: {
            tags: ['Order'],
            summary: 'Update an existing order',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'orderID',
                    required: true,
                    type: 'string'
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                quantity: {
                                    type: 'integer'
                                },
                                productID: {
                                    type: 'string'
                                }
                            }
                        },
                        required: ['quantity', 'productID']
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'order has been successfully updated.'
                },
                '401': {
                    description:
                        'Auth failed because of an missing token or invalid token received.'
                },
                '404': {
                    description: 'Order not found.'
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
                }
            ],
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'order has been successfully deleted.'
                },
                '401': {
                    description:
                        'Auth failed because of an missing token or invalid token received.'
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
