const express=require('express')
const morgan=require('morgan')
require('colors')
require('dotenv').config({path:'./config/dev.env'})
const connectDB =require('./src/db/db')
const cors=require('cors')
connectDB()
const app=express()

app.use(express.json())
app.use(cors())
const PORT=process.env.PORT||5000

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const userRoutes=require('./src/routes/userRoutes')
const fileRoutes=require('./src/routes/fileRoutes')
const folderRoutes=require('./src/routes/folderRoutes')

app.use('/api/users',userRoutes)
app.use('/api/files',fileRoutes)
app.use('/api/folders',folderRoutes)

app.listen(PORT,()=>{console.log(`Server running on the port ${PORT}`.yellow)})