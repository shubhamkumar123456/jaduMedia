import React from 'react'
import { FaCamera } from "react-icons/fa6";

const UserProfile = () => {
  return (
    <div className='container w-[90%] m-auto'>
        <div className='w-full h-[50vh] relative'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAofeV7hVktVlScox-M3jWpF3p_xGlQfkzcg&s" className='w-full h-full object-cover' alt="" />

            <div className='absolute bottom-3 right-6'>
                <label htmlFor="profile" > <FaCamera size={30} color='white'/></label>
                <input type="file" id='profile'  hidden/>
            </div>

            <div className='w-[200px] bottom-[0%] left-[5%] translate-y-[50%] h-[200px] rounded-full absolute bg-green-500'>
               <img className='w-full h-full rounded-full object-cover' src="https://www.whoa.in/download/plain-phone-wallpapers---hd-plain-wallpapers-for-mobile-for-free-download" alt="" /> 
               <p className='text-center text-xl font-semibold'>John carter</p>

               <div className='absolute top-0 right-6'>
                <label htmlFor="cover" > <FaCamera size={30} color='white'/></label>
                <input type="file" id='cover'  hidden/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
    