const multer=require('multer');
const uid=require("generate-unique-id");
var des=multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,"./user_files");
    },
    filename:(req,file,path)=>{
        
            var id=uid({
                length:10,
                includeSymbols:['@','$','!','&']
            })
            let ar=file.originalname.split('.')
        path(null,(id+"."+ar[ar.length-1]));}
})

module.exports=multer({storage:des});