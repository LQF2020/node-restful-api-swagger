const meta = require('./swaggerMeta');
const paths = require('./paths');
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
    paths: paths,
    definitions: definitions
};
