const express=require('express')
const router=express.Router()
const {getGoals,setGoals,updateGoals,deleteGoals}=require('../controllers/goalControllers')

const {protect}=require('../middleware/authMiddleware')

router.get('/',protect,getGoals)

router.post('/',protect,setGoals)

// the above routes can also be written as 
// router.route('/').get(getGoals).post(setGoals)

router.put('/:id',protect,updateGoals)

router.delete('/:id',protect,deleteGoals)



module.exports=router;

