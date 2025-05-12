import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {

 const { aToken, appointments = [], getAllAppointments } = useContext(AdminContext);


  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);  // Add dependency array
  
  return (
    <div style={{ width: '100%', maxWidth: '6xl', margin: '20px' }}>
      <p style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '500' }}>AllAppointments</p>

      <div style={{ backgroundColor: 'white', border: '1px solid', borderRadius: '4px', fontSize: '14px', maxHeight: '80vh', minHeight: '60vh', overflowY: 'scroll' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 2fr fr 0.5fr', gridFlow: 'column', padding: '2px', borderBottom: '1px solid' }}>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item,index)=>(
          <div className='flex flex-wrap justify-between max-smgap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 border-b hover;bg-gray-50' key={index}>
            <p>{index + 1}</p>
            <div>
              <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default AllAppointments
