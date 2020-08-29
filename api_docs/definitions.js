module.exports = {
    user: {
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
};
