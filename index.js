const express=require("express")
const app=express()
const cors=require('cors')
const dbConnect=require("./db/connection")
app.use(cors())
const dotenv=require("dotenv")
dotenv.config({path:"./.env"})
const PORT=process.env.PORT || 4000
dbConnect()

app.use("/user",require("./user/urls"));

app.use("/reports",require("./reports/urls"));

app.get("/*",(req,res,next)=>{
    res.status(404).json({status:false,err:"Url Invalid...."})
})

app.listen(PORT,()=>{
    console.log(`Server Listen at PORT ${PORT}`)
})

