import React from 'react'
import { assets } from '../assets/assets'
const Header = () => {
  return (
    <div className=' bg-purple-800 flex flex-col md:flex-row flex-wrap bg-primary rounded-1g px-6 md:px-10 1g:px-20'>
    {/* -------left side------*/}
    <div className='md:w-1/2 flex flex-col items-start justify-content gap-4 py-10 m.automd:py-[10w] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl 1g:text-5xl text-gray font-semibold md:leading-tight'>
            Book Appointment<br/>With Trusted Doctors
        </p>

    
    <div className='  flex flex-col md:flex-row items-center gap-3 text-gray text-5m font-light'>
        <img className='w-28' src="{assets.logo} " alt="" />
        <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'/>
            schedule your appointment hassle-free.
        </p>
    </div>
        <a href="#speciality" className=' bg-gray-700 flex items-center gap-2  px-8 py-3 rounded-full text-gray-600 text-5m m.automd:m-0 hover:scale-105 transition-all duration-300'>
        Book appointment<img className='w-3' src={assets.arrow_icon} alt=""/>
    </a>
        
    </div>

    

    {/*-----right side-----*/}
     <div className='md:w-1/2 relative'>
        <img className='w-110 md:absolute bottom-0 h-auto' src={assets.header_img} alt="" />
     </div>

    </div>
 
  )
}

export default Header