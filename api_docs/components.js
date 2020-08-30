module.exports = {
    schemas: {
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
            },
            required: ['email', 'password']
        }
    },
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    }
};
