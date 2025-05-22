import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { updatePic } from '../redux/userSlice';
import PostCard from '../components/PostCard';

const UserProfile = () => {

  const [allPosts, setallPosts] = useState([]);
      let userSlice = useSelector((state)=>state.users);
      console.log(userSlice)
      let user = userSlice?.user
      let dispatch = useDispatch()


      const handleCoverChanger = async(e, name)=>{
          let file = e.target.files[0];
          console.log(file)
          console.log(name)

          let formData = new FormData();
          formData.append('file',file);
          formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESET);

       let res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/upload`,formData)

       let url = res.data.secure_url

       let res1 = await axios.put('http://localhost:8090/users/update',{[name]:url} ,{
        headers:{
          'Authorization':userSlice.token
        }
       })

       let data1 = res1.data;
       console.log(data1)
       if(res1.status==200){
          dispatch(updatePic({name,url}))
       }
         
          
      }


      const yourPosts = async()=>{
        let res = await axios.get('http://localhost:8090/posts/yourPost',{
          headers:{
            'Authorization': userSlice.token
          }
        })
        console.log(res.data)
        setallPosts(res.data.posts)
      }

      useEffect(()=>{
        yourPosts()
      },[userSlice?.token])
  return (
    <div className='container w-[90%] m-auto'>
        <div className='w-full h-[50vh] relative'>
            <img src={user.coverPic} className='w-full h-full object-cover' alt="" />

            <div className='absolute bottom-3 right-6'>
                <label htmlFor="profile" > <FaCamera size={30} color='white'/></label>
                <input onChange={(e)=>handleCoverChanger(e,'coverPic')} type="file" id='profile'  hidden/>
            </div>

            <div className='w-[200px] bottom-[0%] left-[5%] translate-y-[50%] h-[200px] rounded-full absolute bg-white border'>
               <img className='w-full h-full rounded-full object-cover' src={user.profilePic} alt="" /> 
               <p className='text-center text-xl font-semibold'>John carter</p>

               <div className='absolute top-0 right-6'>
                <label htmlFor="cover" > <FaCamera size={30} color='white'/></label>
                <input onChange={(e)=>handleCoverChanger(e,'profilePic')} type="file" id='cover'  hidden/>
            </div>
            </div>
        </div>

         <div className="flex w-[400px] m-auto mt-[180px] flex-col gap-2">
              {
                allPosts.map((ele,i)=>{
                  return <PostCard key={ele._id} ele ={ele}/>
                })
              }
            </div>
    </div>
  )
}

export default UserProfile
    