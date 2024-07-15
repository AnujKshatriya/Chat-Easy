import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.user);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });

  }, [message]);

  return (
    <div ref={scroll}>
      <div
        className={`chat ${
          authUser?._id === message.senderId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`${
                message.senderId === authUser._id
                  ? authUser?.profilePhoto
                  : selectedUser.profilePhoto
              }`}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs text-white">{message.createdAt.split('T')[0]}</time>
        </div>
        <div className="chat-bubble text-white">{message?.message}</div>
      </div>
    </div>
  );
};

export default Message;
