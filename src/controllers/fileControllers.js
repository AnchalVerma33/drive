import File from '../models/fileModel'
import Folder from '../models/folderModel'  

const createFile=async(req,res)=>{
    try{
        const { name, link, parentFolder} = req.body
        const user = req.user._id
        console.log(user)
        const file = await File.create({ name,link,parentFolder,user })
        /* Finding Parent Folder and pushing file to Child Files Array */
        const folder = await Folder.findById(parentFolder)
        const prevArray = folder.childFiles
        const newFile = {
            File: file._id
        }
        const newArray = [...prevArray,newFile]
        const updatedFolder = await Folder.findByIdAndUpdate(parentFolder,{childFiles: newArray})
        console.log(updatedFolder)
        return res.status(201).json({
            success: true,
            data: file
        })
    }catch(e){
        if (e.name === 'ValidationError') {
            console.log(e)
            const messages = Object.values(e.errors).map(val => val.message)
            res.status(400).json({
                success: false,
                error: messages
            })

        } else {
            console.log(`Error occured ${e}`)
            return res.status(500).json({
                success: false,
                error: `${e}`
            })
        }
    }
}

const copyFile=async(req,res)=>{
    try{

    }catch(e){
        
    }
}

const moveFile=async(req,res)=>{
    try{

    }catch(e){
        
    }
}

const deleteFile=async(req,res)=>{
    try{

    }catch(e){
        
    }
}

module.exports={createFile,copyFile,moveFile,deleteFile}
