const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const userModel=require("./model/user")
const encryptPassword=(req,res,next)=>{
    try{
        let salt=bcrypt.genSaltSync()
        let password=bcrypt.hashSync(res.body.user_password,salt);
        res['body']['user_password']=password;
        next();
    }
    catch(e){
        return res.status(500).json({"status":false,err:"Server Error...."})
    }
}

const comparePassword=(password1,password2)=>{
    try{
        let res=bcrypt.compareSync(password1,password2);
        if(res){
            return true;
        }
        return false;
    }
    catch(e){
        return false;
    }
}

const generateToken=(data)=>{
    try{
        let token=jwt.sign(data,process.env.TOKEN_STRING);
        return true,token;
    }
    catch(e){
        console.log(e)
        return false,"";
    }
}

const verifyToken=async(req,res,next)=>{
    try{
        let token=req.headers.token;
        if(!token){
            token=req.params.token;
        }
        let data=jwt.decode(token);
        if(data){
            let user=await userModel.findById(data.user_id);
            if(!user || user.user_token!=token){
                return res.status(401).json({"status":false,err:"Invalid User"});
            }
            req['body']['user_id']=data['user_id'];
            next();
        }
        else{
            throw "Invalid User.."
        }
    }
    catch(e){
        console.log(e);
        return res.status(401).json({status:false,err:"Invalid User...."})
    }
}

module.exports={generateToken,verifyToken,encryptPassword,comparePassword};

