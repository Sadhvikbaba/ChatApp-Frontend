import React, { useEffect, useState , useRef} from 'react'
import Message from './Message'
import { getMessage } from '../connecting/connecting'
import { useDispatch, useSelector } from 'react-redux'

function Messages({feed}) {
  const lastMessage = useRef();

  useEffect(()=>{
    setTimeout(()=>{lastMessage.current?.scrollIntoView({behavior : "smooth"})},100);
  } ,[feed])
  

  return (
    <div className='px-4 overflow-auto flex-1'>
      {feed?.map((message , index) => <div key={index} ref={lastMessage}><Message data={message} /></div>)}
      
    </div>
  )
}

export default Messages
