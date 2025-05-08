import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import FormikLogin from './pages/FormikLogin'
import { useSelector } from 'react-redux'
import ForgetPassword from './pages/ForgetPassword'

const App = () => {

  let userSlice = useSelector((state)=>state.users);
  console.log(userSlice)
  let login = userSlice.login  // false

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
          <Routes>
              <Route path='/' element={login===true ? <Home/> : <Navigate to={'/login'}/>}/>
              <Route path='/signup' element={login===false ? <Signup/> : <Navigate to={'/'}/>}/>
              <Route path='/login' element={login===false ? <Login/> : <Navigate to={'/'}/>}/>
              <Route path='/forgetPassword' element={login===false ? <ForgetPassword/> : <Navigate to={'/'}/>}/>
          </Routes>
          <ToastContainer/>
      </BrowserRouter>
      {/* <FormikLogin/> */}
    </div>
  )
}

export default App
