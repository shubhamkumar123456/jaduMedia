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
import FriendProfile from './pages/FriendProfile'
import { fetchUserByToken } from './redux/userSlice'
import Chat from './pages/Chat'

const App = () => {

  let userSlice = useSelector((state)=>state.users);
  console.log(userSlice)
  let login = userSlice.login  // false
  let dispatch = useDispatch()

  // useEffect(()=>{
  //   setUpInterceptors(dispatch)
  // },[dispatch])


  useEffect(()=>{
   if(userSlice.token){
     dispatch(fetchUserByToken(userSlice.token))
   }
  },[userSlice.token])

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
              <Route path='/friendProfile' element={login===true ?<FriendProfile/> : <Navigate to={'/login'}/>}/>
              <Route path='/chat' element={login===true ?<Chat/> : <Navigate to={'/login'}/>}/>
          </Routes>
          <ToastContainer/>
      </BrowserRouter>
      {/* <FormikLogin/> */}

      {/* <h1 className='bg-green-400 hover:bg-black sm:bg-amber-400 md:bg-blue-400 lg:bg-[crimson] xl:bg-amber-950'>hello</h1> */}
    </div>
  )
}

export default App
