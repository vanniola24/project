import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, doctors, userData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const appointmentMpesa = async (appointmentId, phoneNumber) => {
    try {
      if (!phoneNumber) {
        toast.error('Phone number is required for M-Pesa payment')
        return
      }
      const amount = 100 // You can set the amount dynamically based on appointment or user input
      const { data } = await axios.post(backendUrl + '/api/mpesa/stkpush', {
        phoneNumber,
        amount,
        accountReference: appointmentId,
        transactionDesc: 'Appointment payment'
      }, { headers: { token } })

      if (data.success) {
        toast.info('M-Pesa payment initiated. Please complete the payment on your phone.')
      } else {
        toast.error('Failed to initiate M-Pesa payment')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

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
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address</p>
              <p className='text-xs'>{item.docData.adress.line1}</p>
              <p className='text-xs'>{item.docData.adress.line2}</p>
              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {slotDateFormat(item.slotTime)}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && <button className='sm:min-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && <button onClick={() => appointmentMpesa(item._id, userData?.phone)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-400 hover:text-white transition-all duration-300'>Pay with M-Pesa</button>}
              {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-400 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
        {doctors.slice(0, 3).map((item, index) => (
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
