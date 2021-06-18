const { protect } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/create').post(protect,createFile)
router.router('/move/:id').post(protect,moveFile)
router.route('/copy/:id').put(protect,copyFile)
router.route('/delete/:id').delete(protect,deleteFile)

module.exports=router