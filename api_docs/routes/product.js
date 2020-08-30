module.exports = {
    get_post: {
        get: {
            tags: ['Product'],
            summary: 'Get the list of all products',
            produces: ['application/json'],

            responses: {
                '200': {
                    description: 'Return all the existing products.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        },
        post: {
            tags: ['Product'],
            summary: 'Create a new product',
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    required: true,
                                    type: 'string'
                                },
                                price: {
                                    type: 'integer'
                                },
                                productImage: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            },
                            required: ['name', 'price', 'productImage']
                        }
                    }
                }
            },

            security: [{ bearerAuth: [] }],
            responses: {
                '201': {
                    description: 'Product has been successfully created and returned to client.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    get_patch_delete: {
        get: {
            tags: ['Product'],
            summary: 'Get an existing product',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'productID',
                    required: true,
                    type: 'string'
                }
            ],

            responses: {
                '200': {
                    description: 'An existing product will be return.'
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
            tags: ['Product'],
            summary: 'Update an existing product',
            produces: ['application/json'],

            parameters: [
                {
                    in: 'path',
                    name: 'productID',
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
                                name: {
                                    required: true,
                                    type: 'string'
                                },
                                price: {
                                    type: 'integer'
                                }
                            }
                        }
                    }
                }
            },

            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Product has been successfully updated.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        },

        delete: {
            tags: ['Product'],
            summary: 'Delete an existing product',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'productID',
                    required: true,
                    type: 'string'
                }
            ],
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Product has been successfully deleted.'
                },
                '404': {
                    description: 'Product not found.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    }
};
