
const express=require('express')
const router=express.Router()
const {findOneuser,findUsers,deleteUser,editUser}=require('../controllers/userControllers')
//protect route middleware
const{protect}=require('../middleware/authMiddleware')

router.get('/',protect,findUsers)
router.get('/finduser/:id',protect,findOneuser)
router.delete('/deleteuser/:id',protect,deleteUser)
router.put('/edituser/:id',protect,editUser)



module.exports=router;