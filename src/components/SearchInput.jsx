import React from 'react'
import { useForm } from 'react-hook-form';
import {FaSearch} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import {selectChat} from "../store/selectedChat"

function SearchInput() {
  const Dispatch = useDispatch();
  const {register , handleSubmit} = useForm();
  const users = useSelector((state) => state?.users?.users);

  const search = (data) =>{
    if(data.name.length < 3)return toast.error("search input must be above 3 characters");
    const findusers = users.find((c) => c.userName.toLowerCase().includes(data.name.toLowerCase()))
    if(!findusers)return toast.error("no such user found");

    Dispatch(selectChat(findusers))
    
  }
  return (
    <form className='flex items-center ' onSubmit={handleSubmit(search)}>
        <input type='text'  placeholder='Search' className='input input-bordered rounded-l-full bg-gray-700 border-r-0 h-12'
        {...register("name",{required : true})}/>
        <button type="submit" className=' w-12 h-12 flex items-center justify-center border-r-0 bg-gray-700 text-white rounded-r-full'><FaSearch className='w-4 h-4 outline-none'/></button>
    </form>
  )
}

export default SearchInput
