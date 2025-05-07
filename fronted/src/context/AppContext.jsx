import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [currencySymbol] = useState('$');
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
   
    const getDoctorsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${backendUrl}/api/doctor/list`;
            console.log('Fetching doctors from:', url);
            
            const {data} = await axios.get(backendUrl + '/api/doctor/list');

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

    useEffect(() => {
        const ac = new AbortController();
        getDoctorsData();
        return () => ac.abort();
    }, [retryCount]);

    const value = {
        doctors,
        currencySymbol,
        loading,
        error,
        token,setToken,
        backendUrl
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
