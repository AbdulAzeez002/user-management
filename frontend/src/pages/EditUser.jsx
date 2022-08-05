import React from 'react'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { useNavigate,useParams } from 'react-router-dom'
import { getOneUser} from '../features/admin/adminSlice'

import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function EditUser() {

    // const { users, isLoading, isError, message } = useSelector(
    //     (state) => state.users
    //   );

    const navigate=useNavigate()

    const [state,setState]=useState([])
      

    const [formData, setFormData] = useState({
        name: '',
        email: '',
       
       
      })

      // const dispatch = useDispatch();
      const { id }=useParams();
      console.log(id+'99999999999999999999999999999999');  

      // useEffect(() => {
      //   dispatch(getOneUser(id));
      // }, []);

      useEffect(()=>{
        axios({
          method:'get',
          url:`/api/users/getOneUser/${id}`
        })
        .then((res)=>setFormData(res.data))
      },[])

      const { name, email } = formData

    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }

    const onSubmit=async(e)=>{
        e.preventDefault()

        const  data  = await axios.post(`/api/users/editUser/${id}`, {name,email})

        navigate('/admin')


        // axios({
        //   method:'post',
        //   url:(`/api/users/editUser/${id}`,{formData})
        // })
        // const userData={
        //    email,password
        // }
        // dispatch(login(userData))
       }

  return (
    <>
      <section className="heading">
    <h1>Edit User</h1>
    {/* <p>Please login</p> */}
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default EditUser