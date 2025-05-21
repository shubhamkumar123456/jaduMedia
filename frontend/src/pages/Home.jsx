import React, { useEffect, useState } from 'react'
import PostUploader from '../components/PostUploader'
import PostCard from '../components/PostCard'
import axios from 'axios'


const Home = () => {


  const [AllPost, setAllPost] = useState([]);

  let getAllPosts = async()=>{
    let res = await axios.get('http://localhost:8090/posts/allPosts');
    let data = res.data;
    console.log(data)
    setAllPost(data.posts)
  }

  useEffect(()=>{
    getAllPosts()
  },[])
  return (
    <div>
      <PostUploader />

      <div className="flex w-[400px] m-auto flex-col gap-2">
        {
          AllPost.map((ele,i)=>{
            return <PostCard key={ele._id} ele ={ele}/>
          })
        }
      </div>
    </div>
  )
}

export default Home
