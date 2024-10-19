import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';

function Message({data}) {
  const userdata = useSelector((state) => state.auth.userData)
  const anotherData = useSelector((state) => state.chat.chat);
  
  
  return (
    <div className={`chat ${userdata?._id == data.senderId ? "chat-end": "chat-start"}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={userdata?._id == data.senderId ? userdata.profilePic : anotherData.profilePic}></img>            
            </div>
        </div>
        <div className={`chat-bubble text-white ${userdata?._id == data.senderId ? "bg-blue-500" : "bg-gray-700"}`}> {data.message}</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formatDistanceToNow(new Date(data.createdAt))} ago</div>
    </div>
  )
}

export default Message

//userdata.profilePic our
