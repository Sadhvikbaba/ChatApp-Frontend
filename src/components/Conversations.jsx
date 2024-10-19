import React, { useState } from 'react'
import Conversation from './Conversation'
import { useSelector } from 'react-redux'

function Conversations() {
  const users = useSelector((state) => state?.users?.users);
  
  return (
    <div className='flex flex-col py-2 overflow-auto'>
      {users?.map((user , index) => (<Conversation key={index} details={user}/>))}
       
    </div>
  )
}

export default Conversations
