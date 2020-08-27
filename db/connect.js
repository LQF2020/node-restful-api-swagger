const mongoose = require('mongoose');

const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASS } = process.env;
const { DB_NAME } = process.env;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

const dbConn = () => {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB is connected!');
    });
};

module.exports = dbConn;
