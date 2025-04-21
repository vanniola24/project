import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const {aToken} = useContext(AdminContext)
  
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      height: '100vh',
      width: '200px',
      backgroundColor: '#f8f9fa',
      padding: '10px 0',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
    }}>
      {
        aToken && (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <NavLink 
              to={'/admin-dashboard'} 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: isActive ? 'pink' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e9ecef'
                }
              })}
            >
              <img src={assets.home_icon} alt="" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
              <p style={{ margin: 0 }}>Dashboard</p>
            </NavLink>

            <NavLink 
              to={'/all-appointments'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: isActive ? 'pink' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e9ecef'
                }
              })}
            >
              <img src={assets.appointment_icon} alt="" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
              <p style={{ margin: 0 }}>Appointments</p>
            </NavLink>

            <NavLink 
              to={'/add-doctor'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: isActive ? 'pink' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e9ecef'
                }
              })}
            >
              <img src={assets.add_icon} alt="" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
              <p style={{ margin: 0 }}>Add Doctor</p>
            </NavLink>

            <NavLink 
              to={'/doctor-list'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: isActive ? 'pink' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e9ecef'
                }
              })}
            >
              <img src={assets.people_icon} alt="" style={{ width: '10px', height: '10px', marginRight: '10px' }} />
              <p style={{ margin: 0 }}>Doctor List</p>
            </NavLink>
          </ul>
        )
      }
    </div>
  )
}

export default Sidebar
