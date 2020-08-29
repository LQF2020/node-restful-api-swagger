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
    }
};
