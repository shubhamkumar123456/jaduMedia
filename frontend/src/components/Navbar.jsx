import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../redux/userSlice';
import axios from 'axios';

const Navbar = () => {

    const [showUl, setshowUl] = useState(false);
    const [searchedFriends, setsearchedFriends] = useState([]);

    let userSlice = useSelector((state)=>state.users)
    console.log(userSlice)

    let login = userSlice.login

    let dispatch = useDispatch()

    const handleShowUl = ()=>{
        setshowUl(!showUl)
    }



    const handleSearch = async(e)=>{
        let val = e.target.value
        let res = await axios.get(`http://localhost:8090/users/searchFriends?name=${val}`,{
          headers:{
            'Authorization':userSlice.token
          }
        })
        let data = res.data;
        // console.log(data)
        setsearchedFriends(data)

    }
  return (
    <div className='sticky top-0 left-0 px-10 right-0 z-50 flex bg-black h-[65px] items-center justify-between text-white'>
     <div className='flex items-center gap-1 '>
        <img className='w-30' src="/logo.png" alt="" />
        {/* <h1>Social-App</h1> */}
     </div>

  {login===true &&   <form className='relative'>
      <input type="text" onChange={handleSearch} className='border px-4 py-2 rounded'  placeholder='search a friend..'/>
      <div className='bg-black text-white absolute top-full w-full'>
        {searchedFriends.map((ele)=>{
          return <Link onClick={()=>setsearchedFriends([])} to={ userSlice.user._id===ele._id ?'/userProfile' : `/friendProfile?name=${ele.name}&id=${ele._id}`} state = {ele._id} className='flex gap-4 items-center border-b px-2 py-3'>
                <img src={ele.profilePic} className='w-11 h-11 rounded-full border border-blue-400' alt="" />
                <p>{ele.name}</p>
            </Link>
        })}
      </div>
     </form>
}
     <div className='h-full relative flex items-center'>
        <img onClick={handleShowUl} className='w-12 cursor-pointer h-12 rounded-full border border-amber-300' src={userSlice?.user? userSlice.user.profilePic:"https://as1.ftcdn.net/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"} alt="" />

       {showUl && <ul className='flex flex-col bg-black text-white absolute top-full -right-1/2'>
      { login ===true && <li onClick={()=>{ setshowUl(false)}}  className='px-6 py-2 cursor-pointer'><Link to={'/'}>Home</Link></li>}
      { login ===false &&  <li onClick={()=>{ setshowUl(false)}}  className='px-6 py-2 cursor-pointer'><Link to={'/login'}>Login</Link></li>}
      {login ===false &&  <li onClick={()=>{ setshowUl(false)}}  className='px-6 py-2 cursor-pointer'><Link to={'/signup'}>Signup</Link></li>}
      {login ===true &&  <li onClick={()=>{ setshowUl(false)}}  className='px-6 py-2 cursor-pointer'><Link to={'/userProfile'}>Profile</Link></li>}
      {login === true &&  <li onClick={()=>{dispatch(logout()) ; setshowUl(false)}} className='px-6 py-2 cursor-pointer'>Logout</li>}
      </ul>}
     </div>
      
    </div>
  )
}

export default Navbar
