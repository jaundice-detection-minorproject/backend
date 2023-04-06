const reportsModel=require("../model/reports")
const fs=require("fs")
const addFile=async(req,res,next)=>{
    try{
        let {user_filename,user_id,title,description}=req.body;
        let user=await reportsModel.findOne({title});
        if(user){
            return res.status(400).json({"status":false,err:"Title Already Exists"});
        }
        user=await reportsModel.create({user_id,user_filename,title,description});
        return res.status(200).json({status:true,_id:user._id});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

const deleteFile=async(req,res,next)=>{
    try{
        let {user_id,file_id}=req.body;
        let user=await reportsModel.findOne({user_id,_id:file_id});
        if(!user){
            return res.status(400).json({status:false,err:"Invalid File Id"});
        }
        user=await reportsModel.deleteOne({_id:file_id})
        fs.unlinkSync(`../user_files/${user.user_filename}`);
        return res.status(200).json({status:true,_id:user._id});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

const getAllFile=async(req,res,next)=>{
    try{
        let {user_id}=req.body;
        let files=await reportsModel.find({user_id});
        return res.status(200).json({status:true,files});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

const download=async(req,res,next)=>{
    try{
        let {user_id}=req.body;
        let {file_id}=req.params;
        let file=await reportsModel.findOne({user_id,_id:file_id});
        if(!file){
            return res.status(404).json({status:false,err:"Invalid User"});
        }
        return res.status(200).download(`../user_file/${file.user_filename}`);
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

module.exports={addFile,deleteFile,getAllFile,download};