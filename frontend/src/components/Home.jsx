import React from 'react'
import Sidebar from './Sidebar'
import MessageBox from './MessageBox'
import { useSelector } from 'react-redux'
import Login from './Login'

const Home = () => {
  const {authUser} = useSelector(store=>store.user)
  return (
    <div>
    {
      authUser ? <div className='flex sm:h-[450px] md:h-[550px] rounded-md bg-gray-900 shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-300'>
      <Sidebar/>
      <MessageBox/>
    </div> : <Login/>
    }
    </div>
  )
}

export default Home
