const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
const DB_URI = 'mongodb://localhost:27017/node-restful-shop';
// ROOT HOOK Executed before the test run
before(function (done) {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB is connected!');
        done();
    });
});

// ROOT HOOK Excuted after every tests finished
after(function (done) {
    db.close();
    db.on('close', () => {
        console.log('DB is closed');
        done();
    });
});
