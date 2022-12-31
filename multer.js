const multer = require('multer');
const fs = require('fs');
const folderName = 'uploads';
let storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        if(!fs.existsSync(folderName)){
            fs.mkdirSync(folderName);
        }
        cb(null, 'uploads/');
    },
    filename:function(req,file,cb){
        const uniqueSuffix= Date.now() + '-' + Math.round(Math.random(
            1000000000
        ));
        cb(null,`${file.originalname}-${uniqueSuffix}`);
    }
})
let upload = multer({storage:storage});
module.exports = upload;
