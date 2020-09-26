require('dotenv').config();
const http = require('http');
const { dbConn } = require('./db/connect');
const app = require('./app');
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const server = http.createServer(app);

dbConn()
    .then(() => {
        server.listen(port, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Server listening on http://${host}:${port}/api-docs`);
        });
    })
    .catch((err) => {
        console.error('Error caught:');
        console.error(err);
        console.log('Program exiting.');
        process.exit(0);
    });
