const multer = require('multer');
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
let upload = multer({storage:storage});
module.exports = upload;
