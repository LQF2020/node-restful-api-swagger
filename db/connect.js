const mongoose = require('mongoose');

const { DB_URI } = process.env;

mongoose.set('useCreateIndex', true);
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const dbConn = () => {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB is connected!');
    });
};

module.exports = dbConn;
