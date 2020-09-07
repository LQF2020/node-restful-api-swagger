const cors = (req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', 'Content-type');
    if (req.method === 'OPTIONS') {
        res.append('Access-Allow-Control-Methods', 'PUT,DELETE,POST,PATCH,GET');
        res.sendStatus(200);
    } else {
        next();
    }
};
module.exports = cors;
