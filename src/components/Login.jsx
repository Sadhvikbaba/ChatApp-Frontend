import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form";
import { login ,getUsers} from '../connecting/connecting';
import {useDispatch} from "react-redux";
import { login as authLogin} from '../store/authSlice';
import { login as userLogin} from '../store/users';
import toast from "react-hot-toast"


function Login() {
    const {register , handleSubmit} = useForm()
    const Dispatch = useDispatch();

    const loginFunc = async (data) => {
        data.userName = data.userName.toLowerCase()
        await login(data)
        .then((res) =>{
            Dispatch(authLogin(res.message.user))
        })
        .catch((res) => toast.error(res.message)
        )

        await getUsers()
        .then((res) => {
            Dispatch(userLogin(res.message))
        })

        
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center'>
                Login
                <span className='text-blue-500'> Chat App</span>
            </h1>

            <form onSubmit={handleSubmit(loginFunc)}>
                <div>
                    <label className='p-2 label'>
                        <span className='text-base label-text text-blue-400'> Username</span>
                    </label>
                    <input type="text" placeholder='enter username' className='input input-bordered input-info w-full m-2 h-10' 
                            {...register("userName" , {required : true})}
                    />
                </div>
                <div>
                    <label className='p-2 label'>
                        <span className='text-base label-text text-blue-400'> Password</span>
                    </label>
                    <input type="password" placeholder='enter password' className='input m-2 input-bordered input-info w-full h-10' 
                    {...register("password" , {required : true})}/>
                </div>
                <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 my-2 inline-block ml-4'>
                    Don't have an Account?
                </Link>
                <div>
                <button className="btn btn-outline btn-info w-full m-2">Login</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default Login


