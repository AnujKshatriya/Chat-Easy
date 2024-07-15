import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import {useSelector} from 'react-redux'

const OtherUsers = () => {
  useGetOtherUsers()
  const {otherUsers} = useSelector(store=>store.user)
  if(!otherUsers) return;

  return (
    <div className='flex-1 overflow-auto px-2'>
      {
        otherUsers?.map((user)=>{
          return(
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
    </div>
  )
}

export default OtherUsers
