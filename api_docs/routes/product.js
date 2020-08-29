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
            produces: ['application/json'],
            consumes: ['multipart/form-data'],
            parameters: [
                {
                    in: 'formData',
                    name: 'name',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'price',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'formData',
                    name: 'productImage',
                    required: true,
                    type: 'file'
                },
                {
                    in: 'query',
                    name: 'accessToken',
                    required: true,
                    type: 'string'
                }
            ],
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
                    in: 'body',
                    name: 'name',
                    type: 'string'
                },
                {
                    in: 'body',
                    name: 'price',
                    type: 'string'
                },
                {
                    in: 'path',
                    name: 'productID',
                    required: true,
                    type: 'string'
                },
                {
                    in: 'query',
                    name: 'accessToken',
                    required: true,
                    type: 'string'
                }
            ],
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
                },
                {
                    in: 'query',
                    name: 'accessToken',
                    required: true,
                    type: 'string'
                }
            ],
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
