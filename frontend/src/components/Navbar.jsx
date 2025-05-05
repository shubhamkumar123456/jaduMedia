import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [showUl, setshowUl] = useState(false);

    const handleShowUl = ()=>{
        setshowUl(!showUl)
    }
  return (
    <div className='sticky top-0 left-0 px-10 right-0 flex bg-black h-[65px] items-center justify-between text-white'>
     <div className='flex items-center gap-1 '>
        <img className='w-30' src="/logo.png" alt="" />
        {/* <h1>Social-App</h1> */}
     </div>

     <div className='h-full relative flex items-center'>
        <img onClick={handleShowUl} className='w-12 cursor-pointer h-12 rounded-full border border-amber-300' src="https://as1.ftcdn.net/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg" alt="" />

       {showUl && <ul className='flex flex-col bg-black text-white absolute top-full -right-1/2'>
        <li className='px-6 py-2 cursor-pointer'><Link to={'/'}>Home</Link></li>
        <li className='px-6 py-2 cursor-pointer'><Link to={'/login'}>Login</Link></li>
        <li className='px-6 py-2 cursor-pointer'><Link to={'/signup'}>Signup</Link></li>
        <li className='px-6 py-2 cursor-pointer'><Link to={'/profile'}>Profile</Link></li>
        <li className='px-6 py-2 cursor-pointer'>Logout</li>
      </ul>}
     </div>
      
    </div>
  )
}

export default Navbar
