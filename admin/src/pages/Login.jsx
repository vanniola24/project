import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const login = () => {
    const [state,setState]= useState('Admin')
    const[email,setEmail]= useState('')
    const[password,setPassword]= useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        try {
            if (state=== 'Admin') {
                const{data}= await axios.post(backendUrl + '/api/admin/login',{email,password})
                if (data.success){
                    localStorage.setItem('aToken',data.token)
                   setAToken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else {

            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
            console.error('Login error:', error)
        }

    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <form onSubmit={onSubmitHandler} style={{
                padding: '2rem',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                width: '300px'
            }}>
                <div style={{
                    color: 'black',
                    fontSize: '0.9rem'
                }}>
                    <p style={{textAlign: 'center'}}><span style={{color: 'blue'}}>{state} </span><span style={{color: 'black'}}>Login</span></p>
                    <div>
                        <p>Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required style={{
                            width: '100%',
                            padding: '8px',
                            margin: '8px 0',
                            boxSizing: 'border-box'
                        }}/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required style={{
                            width: '100%',
                            padding: '8px',
                            margin: '8px 0',
                            boxSizing: 'border-box',
                            font:'bold',
                        }}/>
                    </div>
                    <button style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'purple',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>Login</button>
                    {
                        state === 'Admin' 
                        ? <p>Doctor Login? <span style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} onClick={()=>setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} onClick={()=>setState('Admin')}>Click here</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default login
