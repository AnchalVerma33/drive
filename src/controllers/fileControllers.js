const File = require('../models/fileModel')
const Folder = require('../models/folderModel')

const createFile = async (req, res) => {
    try {
        const { name, link, parentFolder } = req.body
        const user = req.user._id
        const folder = await Folder.findById(parentFolder)
        const prevArray = folder.childFiles
        let flag=0
        prevArray.forEach(element => {
            if(element.name===name)
                flag=1
        });
        if(String(user)!==String(folder.user))
        {
            return res.status(200).json({
                success:false,
                error:'Not authorized'
            })
        }
        if(flag){
            return res.status(200).json({
                status: false,
                error: 'File with that name already exists'
            })
        }
        else {
                // Creating File
                const file = await File.create({ name, link, parentFolder, user })
                /* Finding Parent Folder and pushing file to Child Files Array */
                const newFile = {
                    name:file.name,
                    file:file._id
                }
                const newArray = [...prevArray, newFile]
                const folderTobeUpdate=await Folder.findById(parentFolder)
                folderTobeUpdate.childFiles=newArray
                const updatedFolder = await folderTobeUpdate.save()
            
                return res.status(201).json({
                    success: true,
                    data: file
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

const copyFile = async (req, res) => {
    try {
        // Need To Pass the folder Id where you want to copy your file
        const folderId = req.body.parentFolder
        const user = req.user._id
        const fileId = req.params.id
        const file = await File.findById(fileId)
        // finding folder where to copy file
        const folder = await Folder.findById(folderId)

        
        if(String(user)!==String(folder.user))
        {
            return res.status(200).json({
                success:false,
                error:'Not authorized'
            })
        }

        const prevArray = folder.childFiles
    
        let flag=0
        prevArray.forEach(element => {
            if(element.name===file.name)
                flag=1
        });
        if(flag){
            return res.status(400).json({
                status: false,
                message: 'File with that name already exists'
            })
        }else{
            const newFile=await File.create({
                name:file.name,
                link:file.link,
                parentFolder:folderId,
                user:user
            })
    
            const newFileItem = {
                name: newFile.name,
                file: newFile._id
            }

            const newArray = [...prevArray, newFileItem]
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

const moveFile = async (req, res) => {
    try {
        const fileId = req.params.id
        const folderId = req.body.parentFolder
        const file = await File.findById(fileId)
        const moveFileId = file._id
        const moveFileName = file.name
        // =======================================================================
        // Parent Folder of File
        
        const folder = await Folder.findById(folderId)
        const childFiles = folder.childFiles
        let flag=0
        childFiles.forEach(element => {
            if(element.name===file.name)
                flag=1
        });
        if(flag){
            return res.status(400).json({
                status: false,
                message: 'File with that name already exists'
            })
        }
        else{
            const parentFolder = file.parentFolder
            
            const newChildFiles=childFiles.filter((obj)=>{
                return String(obj.file)!==String(fileId)})
            // Now Update ParentFolder
            const updatedParent = await Folder.findByIdAndUpdate(parentFolder,{childFiles: newChildFiles})
            // =====================================================================
            // Move File Logic
            // Now Move File To New Folder's Child Array
            const newFolder = await Folder.findById(folderId)
            const prevFiles = newFolder.childFiles
            const newFile = {
                name: moveFileName,
                file: moveFileId
            }
            const updatedFiles = [...prevFiles, newFile]
            // Now make an update
            const updatedFolder = await Folder.findByIdAndUpdate(folderId,{childFiles: updatedFiles})
            const movedFile=await File.findByIdAndUpdate(fileId,{parentFolder:updatedFolder._id})
            return res.status(201).json({
                success: true,
                data: movedFile
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

const deleteFile = async (req, res) => {
    try{
        const fileTobeDeletedId=req.params.id
        const fileTobeDeleted=await File.findById(fileTobeDeletedId)
        const parentFolderId=fileTobeDeleted.parentFolder
        const parentFolder=await Folder.findById(parentFolderId)

        const childFiles=parentFolder.childFiles
        parentFolder.childFiles=childFiles.filter((obj)=>String(obj.file)!==String(fileTobeDeletedId))
        await parentFolder.save()
        await fileTobeDeleted.remove()
        return res.status(201).json({
            success: true,
            data:'Successfully deleted'
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

module.exports = { createFile, copyFile, moveFile, deleteFile }
