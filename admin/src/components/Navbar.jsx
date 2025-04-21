import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const {aToken,setAToken} = useContext(AdminContext)
  const navigate = useNavigate()

  const logout  = ()=> {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={assets.logo} alt="" style={{ width: '80px', height: '80px' }} />
        <p style={{ 
          margin: 0,
          padding: '0.25rem 0.75rem',
          backgroundColor: aToken ? '#0d6efd' : '#6c757d',
          color: 'white',
          borderRadius: '50px',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'purple',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>Logout</button>
   </div>

    )
  }

export default Navbar