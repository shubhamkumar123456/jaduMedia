import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ForgetPassword from './pages/ForgetPassword'
import { setUpInterceptors } from './features/AxiosInstace'
import UserProfile from './pages/UserProfile'

const App = () => {

  let userSlice = useSelector((state)=>state.users);
  console.log(userSlice)
  let login = userSlice.login  // false
  let dispatch = useDispatch()

  // useEffect(()=>{
  //   setUpInterceptors(dispatch)
  // },[dispatch])

  return (
    <div>
      <BrowserRouter>
       <Navbar/>
          <Routes>
              <Route path='/' element={login===true ? <Home/> : <Navigate to={'/login'}/>}/>
              <Route path='/signup' element={login===false ? <Signup/> : <Navigate to={'/'}/>}/>
              <Route path='/login' element={login===false ? <Login/> : <Navigate to={'/'}/>}/>
              <Route path='/userProfile' element={login===true ? <UserProfile/> : <Navigate to={'/login'}/>}/>
              <Route path='/forgetPassword' element={login===false ? <ForgetPassword/> : <Navigate to={'/'}/>}/>
          </Routes>
          <ToastContainer/>
      </BrowserRouter>
      {/* <FormikLogin/> */}
    </div>
  )
}

export default App
