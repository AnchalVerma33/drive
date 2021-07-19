const router=require('express').Router()
const { protect } = require('../middleware/authMiddleware')
const {createFile,copyFile,moveFile,deleteFile, recycled, removeFromRecycle}=require('../controllers/fileControllers')

router.route('/create').post(protect,createFile)
router.route('/move/:id').post(protect,moveFile)
router.route('/copy/:id').put(protect,copyFile)
router.route('/delete/:id').delete(protect,deleteFile)
router.route('/recycled/:id').put(protect,recycled)
router.route('/recover/:id').put(protect,removeFromRecycle)
module.exports=router