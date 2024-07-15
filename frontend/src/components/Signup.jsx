import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [user,setUser] = useState({
    username : "",
    fullname : "",
    password : "",
    confirmPassword : "",
    gender : ""
  })
  
  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/register", user, {
        headers :{
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } 
    catch (error) {
      console.log(error)
    }

    setUser({
      username : "",
      fullname : "",
      password : "",
      confirmPassword : "",
      gender : ""
    })
  }

  return (
    <div className=' min-w-[400px] mx-auto'>
      <div className = " p-6 w-full rounded-md bg-gray-900 shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-300">
        <h1 className='text-3xl py-2 font-bold text-center text-cyan-100 rounded-md'>Signup Page</h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className='label p-2' >
              <span className='text-base text-cyan-200 label-text'>Full Name</span>
            </label>
            <input
              type="text"
              value={user.fullname}
              onChange={(e)=>{setUser({...user, fullname:e.target.value})}}
              placeholder="Fullname"
              className="input input-bordered w-full" />
          </div>
          <div>
            <label className='label p-2' >
              <span className='text-base label-text text-cyan-200 '>Username</span>
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e)=>{setUser({...user, username:e.target.value})}}
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
              onChange={(e)=>{setUser({...user, password:e.target.value})}}
              placeholder="Password"
              className="input input-bordered w-full" />
          </div>
          <div>
            <label className='label p-2' >
              <span className='text-base label-text text-cyan-200'>Confirm Password</span>
            </label>
            <input
              type="password"
              value={user.confirmPassword}
              onChange={(e)=>{setUser({...user, confirmPassword:e.target.value})}}
              placeholder="Confirm Password"
              className="input input-bordered w-full" />
          </div>
          <div className='flex mt-6 mb-6 justify-around bg-gray-100 py-3 rounded-md  items-center'>
            <div className="flex gap-2">
              <p className="text-md text-black">Male</p>
              <input 
                type="checkbox" 
                checked = {user.gender==="male"}
                onChange={()=>setUser({...user,gender:"male"})}
                defaultChecked 
                className="checkbox" />
            </div>
            <div className="flex gap-2">
              <span className="text-md text-black">Female</span>
              <input 
                type="checkbox" 
                checked = {user.gender==="female"}
                onChange={()=>setUser({...user,gender:"female"})}
                defaultChecked 
                className="checkbox" />
            </div>
          </div>
          <p className='text-center py-2 rounded-md text-cyan-200 bg-gray-900'>Already have an account? <Link to={"/login"} className='text-cyan-400 ml-4 underline'> Login </Link></p>
          <button type='submit' className='btn text-cyan-800 btn-block btn-md mt-4 border text-xl border-cyan-800'>Signup</button>
  
        </form>
      </div>
    </div>
  )
}

export default Signup
