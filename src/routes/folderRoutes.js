const { protect } = require('../middleware/authMiddleware')
const {createFolder,copyFolder,moveFolder,deleteFolder}=require('../controllers/folderControllers')
const router=require('express').Router()

router.route('/create').post(protect,createFolder)
router.route('/move/:id').post(protect,moveFolder)
router.route('/copy/:id').put(protect,copyFolder)
router.route('/delete/:id').delete(protect,deleteFolder)

module.exports=router