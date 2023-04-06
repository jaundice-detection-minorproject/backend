const mongoose=require("mongoose")
const connect=()=>{

    mongoose.connect(process.env.CONNECTION_URL,()=>{
        console.log("Connect To DB");
    })
}

module.exports=connect;