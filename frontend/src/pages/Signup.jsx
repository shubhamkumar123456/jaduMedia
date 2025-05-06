import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Signup = () => {

  let navigate = useNavigate()
  const [details, setdetails] = useState({
    name:'',
    email:'',
    password:'',
    cpassword:''
  });

  const handleChanger=(e)=>{
      // console.log(e.target)  // tag
      // console.log(e.target.value)  // tag value
      // console.log(e.target.name)  // tag name attribute
      setdetails({...details , [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e)=>{
      e.preventDefault();
      if(!details.name){
        return toast.warning('name is required')
      }
      if(!details.email){
        return toast.warning('name is required')
      }
      if(!details.password){
        return toast.warning('name is required')
      }
      if(!details.cpassword){
        return toast.warning('name is required')
      }
      if(details.cpassword!== details.password){
        return toast.warning('password does not match')
      }
      console.log(details)

      // regex ,string match in js
      let pattern =  /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/
      let emailCheck = pattern.test(details.email);
      if(!emailCheck){
        return toast.warn('please enter a valid email address')
      }

      console.log(details)

      let res = await axios.post('http://localhost:8090/users/create',details);
      let data = res.data;
      console.log(res)
      console.log(data)
      if(res.status==200 || res.status==201){
          navigate('/login')
      }  
  }
  return (
    <div className='h-[90.6vh] bg-[url(https://www.pixelstalk.net/wp-content/uploads/image10/Cool-Dragon-Wallpaper-1920x1080-HD.jpg)] bg-center bg-cover bg-blue-300 flex lg:flex-row flex-col justify-center items-center gap-2'>
        <h1 className='text-2xl slogan font-semibold max-w-[500px]'>Connect with friends and the world around you Share moments. Build memories. Stay connected</h1>
       <form action="" className='signupForm flex flex-col p-8 rounded-xl  gap-2 w-[400px]'>
        <label htmlFor="">Name</label>
        <input onChange={handleChanger} name='name' className='border rounded-md px-4 py-2' type="text" />

        <label htmlFor="">Email</label>
        <input onChange={handleChanger} name='email' className='border rounded-md px-4 py-2' type="email" />

        <label htmlFor="">Password</label>
        <input onChange={handleChanger} name='password' className='border rounded-md px-4 py-2' type="password" />

        <label htmlFor="">Confirm Password</label>
        <input onChange={handleChanger} name='cpassword' className='border rounded-md px-4 py-2' type="password" />

        <button onClick={handleSubmit} className='bg-green-500 text-white rounded-md px-4 py-2'>Signup</button>
        <p className='text-center my-2'>already have an account ? <Link to={'/login'} className='text-blue-400'>Login</Link></p>

       </form>
    </div>
  )
}

export default Signup
