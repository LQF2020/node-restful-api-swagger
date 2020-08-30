module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Node-Restful-Shop API Doc',
        version: '1.0.0',
        description:
            'A showcase to understand how to implement swagger api into node-restful project',
        license: {
            name: 'MIT',
            url: 'https://choosealicense.com/licenses/mit/'
        },
        contact: {
            name: 'QIFU LU',
            email: 'qifu1995@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://127.0.0.1:3000',
            description: 'Test server'
        }
    ]
};
