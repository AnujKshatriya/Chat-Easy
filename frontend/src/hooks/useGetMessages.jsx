import React, { useEffect } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(store=>store.user)
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/${selectedUser?._id}`)
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    },[selectedUser])

}

export default useGetMessages
