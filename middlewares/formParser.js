const multer = require('multer');

const storageSetting = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}${file.originalname}`);
    }
});
const filterSetting = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storageSetting,
    limits: 1024 * 1024 * 5,
    fileFilter: filterSetting
});

module.exports = upload;
