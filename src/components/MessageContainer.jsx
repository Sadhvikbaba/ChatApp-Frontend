import React, { useState , useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from "react-icons/ti";
import { useSelector ,useDispatch} from 'react-redux';
import { getMessage } from '../connecting/connecting';
import { allMessages ,addMessage as addNew} from '../store/selectedChat';

function MessageContainer() {
  const noChatSelected = useSelector((state) => state.chat.chat);
  const Dispatch = useDispatch()
  

  let messages = useSelector((state) => state.chat.messages);

  useEffect(() =>{
    const load = async() =>{
      await getMessage(noChatSelected?._id)
      .then((res) => {messages = res.message;
        Dispatch(allMessages(res.message))
      })
    }
    if(noChatSelected?._id)load()
  } , [noChatSelected ])

  const addMessage = (data) => {
    console.log(data);
    Dispatch(addNew(data))
  }

  return (
    <div className='flex md:min-w-[450px] flex-col'>
      {!noChatSelected ? <NoMessage /> : (<>
        <div className='bg-slate-600 px-4 py-2 mb-2 flex items-center'>
        <span className=' label-text cursor-pointer'><img src={noChatSelected.profilePic} alt="pic" className='w-9 h-9'/> </span>&nbsp; &nbsp;
        <span className='text-gray-100 font-bold font-sans cursor-pointer'>{noChatSelected?.userName}</span>
      </div>
      <Messages feed={messages}/>
      <MessageInput id={noChatSelected?._id} addMessage={addMessage}/>
      </>)}
    </div>
  )
}

function NoMessage(){
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 sadhvik</p>
        <p>select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}

export default MessageContainer
