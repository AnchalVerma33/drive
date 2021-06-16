const express=require('express')
const morgan=require('morgan')
const colors=require('colors')
require('dotenv').config({path:'./config/dev.env'})
const app=express()
const PORT=process.env.PORT||5000

if(process.env.MODE==='development')
    app.use(morgan('dev'))

app.listen(PORT,()=>{console.log(`Server running on the port ${PORT}`.yellow)})