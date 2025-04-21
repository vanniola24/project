import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=' md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr-1fr] gap-10 my-6 mt-30 text-sm'>
               {/*-----left side----*/}
               <div>
                <img  className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>vannialo is simply dummy text of <br></br>printing and typesetting industry.</p>

               </div>
                {/*-----Center side----*/}
                <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
                </div>
                 {/*-----Right side----*/}
               <div>
               <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul>
                   <li>+254796749535</li>
                   <li>shuttervanny@gmail.com</li>
                </ul>
                
              </div>
        </div>
          {/*-----copyright text----*/}
        <div>
            <hr />
            <p className='py-5 text-sm text-center '>copyright 2025@ prescripto - All Right Reserved.</p>

        </div>
      
    </div>
  )
}

export default Footer
