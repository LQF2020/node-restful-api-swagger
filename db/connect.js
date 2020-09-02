const mongoose = require('mongoose');
const { DB_PROD_URI } = process.env;

const DB_URI = DB_PROD_URI;

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

const dbConn = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB is connected!');
    });
};
const dbClose = () => {
    db.close();
    db.on('close', () => {
        console.log('DB is disconnected!');
    });
};
module.exports = { dbConn, dbClose };
