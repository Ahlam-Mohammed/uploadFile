const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        var extension = file.originalname.split(".");
        var ext = extension[extension.length - 1];

        var uploaded_file_name =
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "." +
        ext;

        cb(null, uploaded_file_name);
    },
});

const upload = multer({
    fileFilter: (req, { fieldname, mimetype, originalname }, cb) => {

        if (fieldname == 'img' && mimetype == 'image/jpeg')
        {
            cb(null, true);
        }
        else if (fieldname == 'cv' && mimetype == 'application/pdf')
        {
            cb(null, true);
        }
        
        else 
        {
            cb(new Error(` type of ${originalname} not support.`), false);
        }

    },
    storage,
});

module.exports = upload;