import React, { useEffect } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import useGetMessages from '../hooks/useGetMessages'
import useListenerMessage from "../hooks/useListenerMessage";

const Messages = () => {
  useGetMessages()
  useListenerMessage()
  const { messages } = useSelector((store) => store.messages);

  return (
    <div className="flex-1 overflow-auto py-4 px-2">
      {messages && messages.map((message) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
};

export default Messages;
