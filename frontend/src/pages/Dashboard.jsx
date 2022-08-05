import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals,reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {user}=useSelector((state)=>state.auth)
  const {goals,isLoading,isError,message}=useSelector((state)=>state.goals)
  
  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    if(user && user.role=='admin'){
      navigate('/admin')
    }
    
    
  },[user,navigate])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <section className="heading">
      <h1>welcome {user && user.name}</h1>
      <p>User Home</p>
      </section>
        
      </>
  )
}

export default Dashboard