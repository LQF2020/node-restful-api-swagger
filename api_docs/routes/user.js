module.exports = {
    signup: {
        post: {
            tags: ['User'],
            description: 'Register an user account',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'newUser',
                    required: true,
                    description: 'An object contains email and password for signup purpose.',
                    schema: { $ref: '#/definitions/user' }
                }
            ],
            responses: {
                '200': {
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
            description: 'An object contains email and password for login purpose.',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'existingUser',
                    description: 'This contains all the user info that used to sign up.',
                    required: true,
                    schema: { $ref: '#/definitions/user' }
                }
            ],
            responses: {
                '200': {
                    schema: {
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'User successfully login.'
                            }
                        }
                    },
                    description: 'Login successfully.'
                },
                '401': {
                    schema: {
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'User failed to login.'
                            }
                        }
                    },
                    description: 'Auth failed. User not able to login.'
                },
                '404': {
                    schema: {
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'This account is not found.'
                            }
                        }
                    },
                    description: 'Auth failed. User not able to login.'
                },
                '500': {
                    schema: {
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Internal server error.'
                            }
                        }
                    },
                    description: 'Internal server error.'
                }
            }
        }
    }
};
