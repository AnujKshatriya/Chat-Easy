import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import OtherUsers from './OtherUsers';
import axios from 'axios'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers,setAuthUser } from '../redux/userSlice';

const Sidebar = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState()
  const dispatch = useDispatch()
  const {otherUsers} = useSelector(store=>store.user)

  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`)
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHanler = (e)=>{
    e.preventDefault()
    const conversationUser = otherUsers?.find((user)=>user.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversationUser){
      // console.log(conversationUser)
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found")
    }
  }

  return (
    <div className='p-4 flex flex-col border-r border-cyan-200'>
        <form onSubmit={(e)=>searchSubmitHanler(e)} className='px-4 mt-2' action="">
            <div className='bg-slate-100 py-2 px-4 rounded-md w-30 flex gap-2 items-center'>
                <input 
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='Search...' 
                className='outline-none border-none w-30 bg-transparent'
                />
                <button type='submit'>
                    <IoSearchSharp  size={'20px'}/>
                </button>
            </div>
        </form>
        <div className='divider my-3 px-2'></div>
        <OtherUsers/>
        <div className='mt-3 flex justify-center'>
          <button onClick={logoutHandler} className=' px-4 py-2 rounded-xl outline-none borde-none bg-cyan-400 hover:bg-cyan-700 hover:text-white text-black font-semibold'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar
