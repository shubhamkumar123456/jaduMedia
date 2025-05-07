import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setState } from '../redux/userSlice';

const Login = () => {

  const dispatch = useDispatch();
  const [details, setdetails] = useState({
    email: '',
    password: ''
  });


  const handleInputChanger = (e) => {
    // e.target --> tag
    // e.target.name --> tag name attribute
    // e.target.value --> tag value
    setdetails({ ...details, [e.target.name]: e.target.value })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(details)

  try {
    let res = await axios.post('http://localhost:8090/users/login',details);
    console.log(res)
    let data = res.data  // {msg:"login successfull", user:{id,name,email},token:"R$%KJHGFGH"}
    console.log(data)
    dispatch(setState(data))
    if(res.status==200){

    }
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg  || 'something went wrong')
  }

  }


  return (
    <div className='h-[90.6vh] bg-[url(https://www.pixelstalk.net/wp-content/uploads/image10/Cool-Dragon-Wallpaper-1920x1080-HD.jpg)] bg-center bg-cover bg-blue-300 flex md:flex-row flex-col justify-center items-center gap-2'>
      <h1 className='text-2xl slogan font-semibold max-w-[500px]'>Connect with friends and the world around you Share moments. Build memories. Stay connected</h1>
      <form action="" className='signupForm flex flex-col p-8 rounded-xl  gap-2 w-[400px]'>


        <label htmlFor="">Email</label>
        <input name='email' onChange={handleInputChanger} className='border rounded-md px-4 py-2' type="email" />

        <label htmlFor="">Password</label>
        <input name='password' onChange={handleInputChanger} className='border rounded-md px-4 py-2' type="password" />

        {/* <label htmlFor="">Confirm Password</label>
        <input className='border rounded-md px-4 py-2' type="password" /> */}

        <button onClick={handleSubmit} className='bg-green-500 text-white rounded-md px-4 py-2'>Login</button>
        <p className='text-center my-2'>Don't have an account ? <Link to={'/signup'} className='text-blue-400'>Signup</Link></p>

      </form>
    </div>
  )
}

export default Login
