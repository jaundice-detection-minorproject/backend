const userModel=require("../model/user")
const {comparePassword,generateToken} =require("../middleware")
const signup=async(req,res,next)=>{
    try{
        let {user_name,user_emailid,user_password}=req.body;
        let user=await userModel.findOne({user_emailid});
        if(user){
            return res.status(400).json({"status":false,err:"Email id Already Exists"});
        }
        user=await userModel.create({user_name,user_emailid,user_password});
        let token=generateToken({user_id:user._id});
        user.user_token=token;
        await user.save()
        return res.status(200).json({status:true,token});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

const signin=async(req,res,next)=>{
    try{
        let {user_emailid,user_password}=req.body;
        let user=await userModel.findOne({user_emailid});
        if(!user){
            return res.status(400).json({status:false,err:"Invalid Emailid or Password"});
        }
        let status=comparePassword(user_password,user.user_password);
        if(!status){
            return res.status(400).json({status:false,err:"Invalid Emailid or Password"}); 
        }
        let token=generateToken({user_id:user._id});
        user.user_token=token;
        await user.save()
        return res.status(200).json({status:true,token});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

const logout=async(req,res,next)=>{
    try{
        let {user_id}=req.body;
        let user=await userModel.findById(user_id);
        user.user_token="";
        await user.save();
        return res.status(200).json({"status":true});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false,err:"Server Error....."})
    }
}

module.exports={signup,signin,logout};