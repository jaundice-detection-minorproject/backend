const express=require("express");
const router=express.Router()
const {addFile,download,deleteFile,getAllFile}=require("./views");
const {verifyToken}=require("../middleware")
const upload=require("./uploadFile")

router.post('/',verifyToken,upload.single("report_file"),addFile);

router.delete("/",verifyToken,deleteFile);

router.get("/",verifyToken,getAllFile);

router.get("/download/:token/:file_id",verifyToken,download);

module.exports=router