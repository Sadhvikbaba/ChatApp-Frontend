import React from 'react'
import {BiLogOut} from "react-icons/bi"
import { logout } from '../connecting/connecting'
import { logout as authLogout } from '../store/authSlice'
import { logout as userLogout } from '../store/users'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()

  const log = async() =>{
    await logout()
    .then((res) =>{ 
      Navigate("/login")
      Dispatch(authLogout())
      Dispatch(userLogout())
    })
  }
  return (
    <div className='mt-auto cursor-pointer text-2xl text-white' onClick={() => log()}>
      <BiLogOut/>
    </div>
  )
}

export default LogoutBtn
