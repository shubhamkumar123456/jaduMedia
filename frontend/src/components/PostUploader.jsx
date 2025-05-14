import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const PostUploader = () => {
    const [showImoji, setshowImoji] = useState(false);
  return (
    <div>
        <div className='w-[400px] h-[200px] border m-auto'>
            <div className='flex gap-2 items-center'>
                <img src="https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg" alt=""  className='w-16 h-16 rounded-full'/>
                <textarea className='border w-full' name="" id="" placeholder="what's in your mind.."></textarea>
            </div>

            <div className='mt-5 flex gap-4 items-center'>
                <input hidden id='files' type="file" />
                <label className='bg-green-800 text-white rounded-md px-4 py-2 text-center' htmlFor="files">Image/Video</label>


                <MdEmojiEmotions  onClick={()=>setshowImoji(!showImoji)} size={25} color='green'/>

            </div>
        </div>
                <EmojiPicker open={showImoji}/>
    </div>
  )
}

export default PostUploader
