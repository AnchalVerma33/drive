const { protect } = require('../middleware/authMiddleware')

const router=require('express').Router()

router.route('/create').post(protect,createFolder)
router.router('/move/:id').post(protect,moveFolder)
router.route('/copy/:id').put(protect,copyFolder)
router.route('/delete/:id').delete(protect,deleteFolder)

module.exports=router