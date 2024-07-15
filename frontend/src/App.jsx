import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/register',
    element : <Signup/>
  }
])

const App = () => {
    const {authUser} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const {socket} = useSelector(store=>store.socket)

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:3000",{
                query:{
                    userId : authUser?._id
                },
                transports: ['websocket', 'polling'],
            })
            dispatch(setSocket(socket))
            
            socket.on("getOnlineUsers", (users)=>{
              dispatch(setOnlineUsers(users))
            })

            return () => socket.close();
        }
        else{
            if(socket){
                socket.close();
                dispatch(setSocket(null))
            }
        }
    },[authUser])

  return (
    <div className='p-4 h-screen flex justify-center items-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
