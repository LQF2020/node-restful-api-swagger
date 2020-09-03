const mongoose = require('mongoose');

let DB_URI;

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

const dbConn = async () => {
    if (process.env.NODE_ENV === 'test') {
        DB_URI = process.env.DB_TEST_URI;
    } else {
        DB_URI = process.env.DB_PROD_URI;
    }
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB is connected!');
    } catch (error) {
        throw new Error(`DB connection error: ${error}`);
    }
};

const dbClose = async () => {
    try {
        await db.close();
        console.log('DB is disconnected!');
    } catch (error) {
        throw new Error(`DB connection failed to close: ${error}`);
    }
};
module.exports = { dbConn, dbClose };
