const util    = require("util");
const multer  = require("multer");
const fs      = require('fs-extra');
const basedir = require('../basedir');

const uploadPath = basedir + "/uploads/";


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true});
        }
        cb(null, uploadPath);
    },
    filename   : (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage
}).single("task_file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;