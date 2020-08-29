module.exports = {
    signup: {
        post: {
            tags: ['User'],
            summary: 'Register an user account',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'newUser',
                    required: true,
                    description: 'An object contains email and password for signup purpose.',
                    schema: { $ref: '#/definitions/User' }
                }
            ],
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
            parameters: [
                {
                    in: 'body',
                    name: 'existingUser',
                    description: 'An object contains email and password for login purpose.',
                    required: true,
                    schema: { $ref: '#/definitions/User' }
                }
            ],
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
