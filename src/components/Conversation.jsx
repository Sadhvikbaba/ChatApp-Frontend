import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {selectChat} from "../store/selectedChat"

function Conversation({details}) {
  const Dispatch = useDispatch();
  const online = useSelector((state) => state?.users?.onlineUsers);
  const isOnline = online.includes(details._id);

  
  return (
    <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded cursor-pointer p-2 py-1' onClick={() => {
          Dispatch(selectChat(details))
        }}>
            <div className={`avatar ${isOnline? "online" :"offline"}`}>
                <div className='w-12 rounded-full'>
                    <img src={details.profilePic}></img>
                </div>
            </div>
            <div className='font-bold text-xl'>{details.userName}</div>
        </div>
        <div className="divider h-1 my-0 py-0"></div>
    </>
  )
}

export default Conversation
