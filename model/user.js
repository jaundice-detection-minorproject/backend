const mongoose=require("mongoose")
const userModel=new mongoose.Schema({
    user_name:{
        type:String,
        require:true,
    },
    user_emailid:{
        type:String,
        require:true,
    },
    user_password:{
        type:String,
        require:true,
    },
    user_token:{
        type:String,
        require:true,
        default:""
    },
})

module.exports=mongoose.model("user",userModel)