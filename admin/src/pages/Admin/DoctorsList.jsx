import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { changeAvailability } from '../../../../backend/controllers/doctorController'

const DoctorsList = () => {
  const {doctors, aToken ,getAllDoctors,changeAvailability} = useContext(AdminContext)

  console.log('Doctors:', doctors)
  
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])
  
  return (
    <div >
      <h1 style={{
                  fontSize: "14px",
                  fontWeight: "600",}}>
                    All Doctors</h1>
       
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, width: "40%" }}>
        {
          Array.isArray(doctors) && doctors.map((item,index)=>(
            <div key={index} style={{ padding: 10, border: "1px solid #ccc", borderRadius: 4 }}>
              <img style={{width:"70%",cursor:"pointer" , objectFit: "cover", borderRadius:"4",active:"bg-purple-600", rounded: "transition-colors"}} src={item.image} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
                <div>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
