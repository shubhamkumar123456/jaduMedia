import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-[90.6vh] bg-[url(https://www.pixelstalk.net/wp-content/uploads/image10/Cool-Dragon-Wallpaper-1920x1080-HD.jpg)] bg-center bg-cover bg-blue-300 flex justify-center items-center gap-2'>
        <h1 className='text-2xl slogan font-semibold max-w-[500px]'>Connect with friends and the world around you Share moments. Build memories. Stay connected</h1>
       <form action="" className='signupForm flex flex-col p-8 rounded-xl  gap-2 w-[400px]'>
 

        <label htmlFor="">Email</label>
        <input className='border rounded-md px-4 py-2' type="email" />

        <label htmlFor="">Password</label>
        <input className='border rounded-md px-4 py-2' type="password" />

        {/* <label htmlFor="">Confirm Password</label>
        <input className='border rounded-md px-4 py-2' type="password" /> */}

        <button className='bg-green-500 text-white rounded-md px-4 py-2'>Signup</button>
        <p className='text-center my-2'>Don't have an account ? <Link to={'/signup'} className='text-blue-400'>Signup</Link></p>

       </form>
    </div>
  )
}

export default Login
