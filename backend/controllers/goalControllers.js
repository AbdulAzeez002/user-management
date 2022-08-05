const asyncHandler=require('express-async-handler')
const Goal=require('../models/goalModel')
const User=require('../models/userModel')

//@description: Get goals
// @route : GET /api/goals
// @access : private 

const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
   
    res.status(200).json(goals)
})

//@description: set goals
// @route : POST /api/goals
// @access : private

const setGoals=asyncHandler(async(req,res)=>{
    console.log(req.body);
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text fielduu')
    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
})

//@description: update goals
// @route : PUT /api/goals
// @access : private

const updateGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user=await User.findById(req.user.id)

    //check for user

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // make sure loggedIn user mathes the goal user

    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('user not authorized') 
    }

    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoal)
})

//@description: delete goals
// @route : DELETE /api/goals
// @access : private

const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user=await User.findById(req.user.id)

    //check for user

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // make sure loggedIn user mathes the goal user

    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('user not authorized') 
    }
    
    await goal.remove()
    res.status(200).json({message:req.params.id})
})

module.exports={
    getGoals,setGoals,updateGoals,deleteGoals
}