const logger = function (req, res, next) {
    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}-${
        currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
    const { method } = req;
    const { url } = req;
    const status = res.statusCode;
    const log = `[${formattedDate}] ${method}:${url} ${status}`;
    console.log(log);
    next();
};
module.exports = logger;
