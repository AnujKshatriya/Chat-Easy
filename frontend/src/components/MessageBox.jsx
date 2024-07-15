import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from '../redux/userSlice'

const MessageBox = () => {
  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.user)
  const {authUser} = useSelector(store=>store.user)
  const {onlineUsers} = useSelector(store=>store.user)
 
  useEffect(()=>{
    return ()=>dispatch(setSelectedUser(null))
  },[])

  if(selectedUser===null){
    return (
      <div className="py-5 flex justify-center items-center px-4 md:min-w-[550px] ">
        <div className='flex flex-col gap-2'>
          <p className='text-3xl text-center text-white'>Hi, {authUser?.fullname}</p>
          <p className='text-2xl text-white'>Don't feel shy, start your chat...</p>
        </div>
      </div>
    )
  }

  const isSelectedUserOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="py-5 flex flex-col px-4 md:min-w-[550px] ">
      <div className="flex items-center py-2 px-6 bg-gray-800 rounded-md cursor-pointer bg-opacity-90 gap-4">
        <div className={` w-10 rounded-[50%] avatar ${isSelectedUserOnline ? 'online' : ''}`}>
          <img
            src={selectedUser.profilePhoto }
            alt=""
          />
        </div>
        <div className="flex ">
          <p className="text-2xl text-white">{selectedUser?.fullname }</p>
        </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
  )
}

export default MessageBox
