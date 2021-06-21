const Folder = require("../models/folderModel")

const createFolder=async(req,res)=>{
    try{
        const {name,parentFolder}=req.body
        const folder=await Folder.findById(parentFolder)
        const prevArray=folder.childFolder
        let flag=0
        prevArray.forEach(element => {
            if(element.name===name)
                flag=1
        });
        if(flag){
            return res.status(400).json({
                status: false,
                message: 'Folder with that name already exists'
            })
        }
        else {
                const folder=await Folder.create({name,parentFolder,childFolder:[],childFiles:[],user:req.user._id})
                const newFolder = {
                    name:folder.name,
                    folder:folder._id
                }
                const newArray = [...prevArray, newFolder]
                const updatedFolder = await Folder.findByIdAndUpdate(parentFolder, { childFolder: newArray })
                return res.status(201).json({
                    success: true,
                    data: folder
                })
        }

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

const copyFolder=async(req,res)=>{
    try {
        // Need To Pass the folder Id where you want to copy your file
        const destinationFolderId = req.body.parentFolder
        const user = req.user._id
        const folderId = req.params.id
        const folder = await Folder.findById(folderId)
        // finding folder where to copy file
        const destinationFolder = await Folder.findById(destinationFolderId)
        const prevArray = destinationFolder.childFolder
        let flag=0
        prevArray.forEach(element => {
            if(element.name===folder.name)
                flag=1
        });
        if(flag){
            return res.status(400).json({
                status: false,
                message: 'Folder with that name already exists'
            })
        }else{
            const newFolder=await File.create({
                name:file.name,
                link:file.link,
                parentFolder:folderId,
                user:user,
                childFolder:folder.childFolder,
                childFiles:folder.childFiles
            })
            const newFolderItem = {
                name: newFolder.name,
                folder: newFolder._id
            }
            const newArray = [...prevArray, newFolderItem]
            const updatedFolder = await Folder.findByIdAndUpdate(folderId, { childFiles: newArray })
            return res.status(201).json({
                success: true,
                data: newFile
            })
        }
    } catch (e) {
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

const moveFolder=async(req,res)=>{
    try{

    }catch(e){
        
    }
}

const deleteFolder=async(req,res)=>{
    try{

    }catch(e){
        
    }
}

module.exports={createFolder,copyFolder,moveFolder,deleteFolder}