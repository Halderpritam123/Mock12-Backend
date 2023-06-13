const express=require('express')
const { connection } = require('./db')
const { jobRoute } = require('./route/job.route')
const cors=require('cors')

require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/jobs",jobRoute)
app.get('/',(req,res)=>{
    res.status(200).send({"msg":"server working Fine"})
})
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Server connected")
    } catch (error) {
        console.log(error)
        console.log("Server not connected")
    }
    console.log(`Server is running on port ${process.env.port}`)
})
