import { createContext, useEffect, useState } from "react";
<<<<<<< HEAD
import axios from 'axios'
=======
import axios from 'axios';
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [currencySymbol] = useState('$');
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
<<<<<<< HEAD
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
     const [userData, setUserData] = useState(false)
=======
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
   
    const getDoctorsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${backendUrl}/api/doctor/list`;
            console.log('Fetching doctors from:', url);
            
<<<<<<< HEAD
            const {data} = await axios.get(backendUrl + '/api/doctor/list');
=======
            const {data} = await axios.get(url, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f

            if (data.success) {
                if (data.doctors?.length > 0) {
                    setDoctors(data.doctors);
                } else {
                    setError('No doctors available');
                    toast.info('No doctors found in database');
                }
            } else {
                throw new Error(data.message || 'Failed to fetch doctors');
            }
        } catch (error) {
            console.error('API Error:', error);
            const message = error.response?.data?.message || error.message;
            setError(message);
            toast.error(`Failed to load doctors: ${message}`);
            
            // Auto-retry after 5 seconds (max 3 times)
            if (retryCount < 3) {
                setTimeout(() => {
                    setRetryCount(c => c + 1);
                    getDoctorsData();
                }, 5000);
            }
        } finally {
            setLoading(false);
        }
    };
<<<<<<< HEAD
    const loadUserProfileData =  async()=> {
        try {
            const {data}= await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            
            toast.error(error.message)
        }
    }
=======
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f

    useEffect(() => {
        const ac = new AbortController();
        getDoctorsData();
        return () => ac.abort();
    }, [retryCount]);

<<<<<<< HEAD

    useEffect(()=>{
        if (token) {
            loadUserProfileData()
            
            
        }
        else{
            setUserData(false)
        }

    },[token])

    

    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        loading,
        error,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
=======
    const value = {
        doctors,
        currencySymbol,
        loading,
        error
>>>>>>> f2a2abe875e847af356aace865bb7907cd153d0f
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
