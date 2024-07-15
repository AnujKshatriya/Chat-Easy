import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({user}) => {

  const dispatch = useDispatch()
  const {selectedUser, onlineUsers} = useSelector(store=>store.user)
  
  const setSelectedUserHandler = ()=>{
    dispatch(setSelectedUser(user))
  }
  const isOnline = onlineUsers?.includes(user._id)

  return (
    <div className="">
      <div onClick={()=>setSelectedUserHandler(user)} className={`  ${user?._id===selectedUser?._id ? 'bg-cyan-700 bg-opacity-160' : 'bg-gray-800 bg-opacity-50'} flex items-center  hover:bg-cyan-700 hover:bg-opacity-100 rounded-md cursor-pointer py-1 px-3 gap-4`}>
        <div className={`ml-2 w-10 rounded-[50%] avatar ${isOnline? "online" : ""}`}>
          <img
            src={user.profilePhoto}
            alt=""
          />
        </div>
        <div className="flex ">
          <p className="text-lg mr-6 text-white">{user.fullname}</p>
        </div>
      </div>
      <div className="divider my-1 py-0 h-1"></div>
    </div>
  );
};

export default OtherUser;
