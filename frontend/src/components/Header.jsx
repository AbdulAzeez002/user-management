import React from 'react'
import {FaRoad, FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'  // font awesome

import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'

function Header() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)

    const onLogout=()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>React Project</Link>
        </div>
        <ul>
            {user ? (<li>
                <button className='btn' onClick={onLogout}>
               
                    <FaSignInAlt/>Logout</button>
            </li>):(<> <li>
                

                    <Link to="/login">
                    <FaSignOutAlt/>Login
                </Link>
               
            </li>

            <li>
                <Link to="/register">
                    <FaUser/>Register
                </Link>
            </li></>)}
           
        </ul>
    </header>
  )
}

export default Header