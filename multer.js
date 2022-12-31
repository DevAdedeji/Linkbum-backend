const multer = require('multer');
const fs = require('fs');
const path = require('path')
const folderName = 'uploads';
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(!fs.existsSync(folderName)){
            fs.mkdirSync(folderName);
        }
        cb(null, 'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    },
})
let upload = multer({
    storage:storage, 
    fileFilter:(req,file,cb)=>{
        const fileTypes = /jpeg|jpg|png|gif|webp/;
        const extName = path.extname(file.originalname).toLowerCase();
        const isValid = fileTypes.test(extName);
        if (!isValid) {
        return cb(new Error(JSON.stringify({ message: "Invalid file type" })));
        }
        cb(null, true);
    },
    limits:{fieldSize: 1024 * 1024}},
    );
module.exports = upload;
