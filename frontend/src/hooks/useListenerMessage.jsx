import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useListenerMessage = () => {
  const socket = useSelector(store => store.socket.socket);
  const messages = useSelector(store => store.messages.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (newMessage) => {
      dispatch(setMessages([...(messages || []), newMessage]));
    };

    socket?.on("newmessage", handleMessage);
    
    return () => {
      socket?.off("newmessage", handleMessage);
    };
  }, [socket, messages, dispatch]);

};

export default useListenerMessage;

