const mongoose=require("mongoose")
const reportsModel=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    user_filename:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        default:""
    }
    
})

module.exports=mongoose.model("reports",reportsModel)