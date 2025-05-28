import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PiImagesLight } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';

const FriendProfile = () => {

  const [friend, setfriend] = useState('');
  const [friendPost, setfriendPost] = useState([]);

  let userSlice = useSelector((state)=>state.users);
  // console.log(userSlice)
  let location = useLocation();
  // console.log(location)
  let friendId = location.state
  console.log(friendId)


  let getFriendData = async()=>{
    let res = await axios.get(`http://localhost:8090/users/friend/${friendId}`,{
      headers:{
        'Authorization':userSlice.token
      }
    })

    let data = res.data;
    console.log(data)
    setfriend(data.friend);
    setfriendPost(data.friendPosts)
  }

  useEffect(()=>{
    getFriendData()
  },[])

  return (
    <div className='container m-auto'>
        <div className="cover relative w-full h-[50vh]">
            <img className='w-full h-full' src={friend.coverPic} alt="" />

            <div className="profile bg-white border w-[200px] h-[200px] rounded-full absolute bottom-[-20%] left-[5%]">
                <img className='w-full h-full rounded-full' src={friend.profilePic} alt="" />
            </div>
        </div>

          <div className="flex w-[400px] m-auto mt-[100px] flex-col gap-2">
                {
                  friendPost.map((ele,i)=>{
                    return <PostCard   getAllPosts={  getFriendData}  key={ele._id} ele ={ele}/>
                  })
                }
              </div>
    </div>
  )
}

export default FriendProfile
