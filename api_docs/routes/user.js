module.exports = {
    signup: {
        post: {
            tags: ['User'],
            summary: 'Register an user account',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'User successfully created. An verification email will be sent.'
                },
                '409': {
                    description: 'Email already exist.'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    login: {
        post: {
            tags: ['User'],
            summary: 'User login with email and password',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/User' }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User login successfully, with API access token provided.'
                },
                '401': {
                    description: 'Auth failed with an incorrect password.'
                },
                '404': {
                    description: 'This user account is not found.'
                },
                '500': {
                    description: 'Internal server error.'
                }
            }
        }
    }
};
