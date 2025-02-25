import React, { useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user)
  const {messages} = useSelector(store=>store.messages);


  const messageSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/send/${selectedUser?._id}`,{message:message},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      console.log(" submit handler response ",res)
  
      dispatch(setMessages([...messages, res?.data?.newMessage])) 
      
    } 
    catch (error) {
      console.log("error in message submit handler ",error)
    }
    setMessage("")
  }

  return (
    <div>
      <form onSubmit={(e)=>messageSubmitHandler(e)} action="">
        <div className='bg-gray-800 py-2 bg-opacity-160 w-full flex justify-around items-center rounded-md'>
            <input 
            className='w-[80%] px-4 text-white outline-none bg-transparent'
            type="text" 
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder='Write your message....'
            />
            <button type='submit' className='bg-cyan-400 text-center p-2 rounded-full'>
                <IoSendSharp size={'20px'} />
            </button>
        </div>
      </form>
    </div>
  )
}

export default SendInput
