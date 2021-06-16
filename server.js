const express=require('express')
const morgan=require('morgan')
const colors=require('colors')
const app=express()
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`Server running on the port ${PORT}`.yellow)})