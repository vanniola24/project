<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {backendUrl,token,setToken} = useContext(AppContext)
  const navigate = useNavigate()

=======
import React, { useState } from 'react'

const Login = () => {

>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
  const [state,setState] = useState('Sign Up')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
<<<<<<< HEAD

    try {
      if (state === 'Sign Up') {
        const {data} =  await axios.post (backendUrl + '/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else {
          toast.error(data.message)
        }
        
      }else{

        const {data} =  await axios.post (backendUrl + '/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{

    if(token){
      navigate('/')

    }
  },[token])

  return (
   <form onSubmit={onSubmitHandler}  className="min-h-[80vh] flex items-center">
=======
  }

  return (
   <form  className="min-h-[80vh] flex items-center">
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "login"}</p>
      <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
      {
        state === "Sign Up" &&  
        <div className='w-full'>
        <p>Full name</p>
<<<<<<< HEAD
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
=======
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name)} value={name} />
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
      </div>
      }
     
      <div className='w-full'>
        <p>Email</p>
<<<<<<< HEAD
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setEmail(e.target.value)} value={email} />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setPassword(e.target.value)} value={password} />
      </div>
      <button type='submit' className='bg-purple-600 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "login"}</button>
=======
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setEmail(e.target.name)} value={email} />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setPassword(e.target.name)} value={password} />
      </div>
      <button className='bg-purple-600 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "login"}</button>
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
      {
        state === "Sign Up"
        ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-purple-600 underline cursor-pointer'>Login here</span></p>
        : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='text-purple-600 underline cursor-pointer'>click here</span></p>
      }
    </div>
    </form>
  )
}

export default Login
