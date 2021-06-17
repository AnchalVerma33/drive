const router=require('express').Router()
const {authUser,registerUser} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login',authUser)
router.route('/').post(registerUser)

module.exports=router