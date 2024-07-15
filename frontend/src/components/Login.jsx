import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

const Signup = () => {

  const [user,setUser] = useState({
    username : "",
    password : "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e)=>{
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/login", user, {
        headers :{
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      })
      dispatch(setAuthUser(res.data))
      navigate('/')
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }

    setUser({
      username : "",
      password : "",
    })
  }

  return (
    <div className=' min-w-[400px] mx-auto'>
      <div className = " p-6 w-full rounded-md bg-gray-900 shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-300">
        <h1 className='text-3xl py-2 font-bold text-center text-cyan-100 rounded-md'>Login Page</h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className='label p-2' >
              <span className='text-base label-text text-cyan-200 '>Username</span>
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e)=>setUser({...user, username:e.target.value})}
              placeholder="Username"
              className="input input-bordered w-full" />
          </div>
          <div>
            <label className='label p-2' >
              <span className='text-base label-text text-cyan-200'>Password</span>
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e)=>setUser({...user, password:e.target.value})}
              placeholder="Password"
              className="input input-bordered w-full" />
          </div>
          <p className='text-center mt-5 py-2 rounded-md text-cyan-200 bg-gray-900'>Don't have an account? <Link to={"/register"} className='text-cyan-400 ml-4 underline'> Signup </Link></p>
          <button type='submit' className='btn text-cyan-800 btn-block btn-md mt-4 border text-xl border-cyan-800'>Login</button>
  
        </form>
      </div>
    </div>
  )
}

export default Signup
