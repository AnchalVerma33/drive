const mongoose =require('mongoose')

const FolderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Folder',
    },
    childFolder:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Folder',
        }
    ],
    childFiles:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'File',
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
},{
    timestamps:true
})

const Folder=mongoose.model('Folder',FolderSchema)
module.exports=Folder