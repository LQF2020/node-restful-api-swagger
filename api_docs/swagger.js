const meta = require('./swaggerMeta');
const user = require('./routes/user');
const definitions = require('./definitions');
module.exports = {
    swagger: meta.swagger,
    info: {
        title: meta.info.title,
        version: meta.info.version,
        description: meta.info.description,
        license: {
            name: meta.info.license.name,
            url: meta.info.license.url
        },
        contact: {
            name: meta.info.contact.name,
            url: meta.info.contact.url,
            email: meta.info.contact.email
        }
    },
    schemes: meta.schemes,
    paths: {
        '/user/signup': user.signup,
        '/user/login': user.login
    },
    definitions: definitions
};
