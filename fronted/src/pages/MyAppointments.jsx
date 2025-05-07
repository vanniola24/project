import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {
  const {doctors} = useContext(AppContext)

  // Function to format date from "YYYY-MM-DD" to "DD,MMM,YYYY"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {doctors.slice(0,3).map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address</p>
              <p className='text-xs'>{item.adress.line1}</p>
              <p className='text-xs'>{item.adress.line2}</p>
              
              {item.slots_booked && Object.entries(item.slots_booked).map(([date, times], i) => (
                <div key={i}>
                  <p className='text-sm mt-1'>
                    <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>
                    {formatDate(date)} | {times.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-400 hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-400 hover:text-white transition-all duration-300'>Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
