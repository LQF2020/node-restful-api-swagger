const { dbConn, dbClose } = require('../db/connect');
require('dotenv').config();
// ROOT HOOK Executed before the test run
before(async function () {
    await dbConn();
});

// ROOT HOOK Excuted after every tests finished
after(async function () {
    await dbClose();
});
