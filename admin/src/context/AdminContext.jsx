import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'):'')
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log('Backend URL:', backendUrl); // ✅ Add this here


    const getAllDoctors = async () => {
        try {

            console.log('Fetching doctors with token:', aToken)


            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
                headers: {
                    aToken: aToken
                }
            })

            console.log('Doctors fetch response:', data)
            if (data.success) {
                setDoctors(data.doctors)
                console.log('Doctors set:', data.doctors)

                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId},{headers :{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(error.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
            if(data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)

            }
            else{
                toast.error(data.message)
            } 
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,changeAvailability,
        appointments,setAppointments,
        getAllAppointments
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
 export default  AdminContextProvider
