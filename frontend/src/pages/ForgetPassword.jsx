import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
  let inputRef = useRef()


  const handleSubmit = async () => {
    let obj = {
      email: inputRef.current.value
    }

    try {
      let res = await axios.post('http://localhost:8090/users/forgetPassword', obj);
      console.log(res)
      toast.success(res.data.msg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' mt-[80px] flex justify-center  gap-2 flex-col'>
      <h1 className='text-center font-semibold'>Forget password page</h1>
      <div className='flex md:flex-row flex-col gap-3 items-center justify-center '>
        <label htmlFor="">Enter your email </label>
        <input ref={inputRef} type="text" placeholder='email' className='px-4 py-2 rounded border outline-none ' />
        <button onClick={handleSubmit} className='bg-green-500 rounded px-4 py-2 '>Submit</button>
      </div>
    </div>
  )
}

export default ForgetPassword
