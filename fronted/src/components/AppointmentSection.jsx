import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
  return (
    <div  className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10 '>
        <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>
            <div className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 px-4 sm:px-6'>
            {doctors.slice(0,10).map((item,index)=>(
                <div key={item._id} onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                   <img className='bg-blue-50 w-full object-cover h-48' src={item.image} alt="" />
                   <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                   </div>
                </div>
            ))}
        </div>
        <button  onClick={() =>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
      
    </div>
  )
}

export default TopDoctors

import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppointmentSection = () => {
  const navigate = useNavigate()
  
  return (
    <div className="flex bg-purple-600 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 90+ Trusted Doctors</p>
        </div>
        <button 
          onClick={() => {navigate('/signup'); scrollTo(0,0)}}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img 
          className="w-79 absolute bottom-0 right-0 max-w-md" 
          alt="Doctor appointment" 
          src="/src/assets/appointment_img.jpeg" 
        />
      </div>
    </div>
  )
}

export default AppointmentSection