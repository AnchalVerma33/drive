const { protect } = require('../middleware/authMiddleware')
const {createFolder,copyFolder,moveFolder,deleteFolder,getParentFolder, getFolder}=require('../controllers/folderControllers')
const router=require('express').Router()

router.route('/:id').get(protect,getParentFolder)
router.route('/details/:id').get(protect,getFolder)
router.route('/create').post(protect,createFolder)
router.route('/move/:id').post(protect,moveFolder)
router.route('/copy/:id').put(protect,copyFolder)
router.route('/delete/:id').delete(protect,deleteFolder)

module.exports=router