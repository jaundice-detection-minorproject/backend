const express=require("express");
const router=express.Router()
const {signup,signin,logout}=require("./view");
const {encryptPassword,verifyToken}=require("../middleware")

router.post("/",encryptPassword,signup);

router.post('/login',signin);

router.delete('/',verifyToken,logout);

module.exports=router