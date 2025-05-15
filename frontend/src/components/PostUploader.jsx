import React, { useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const PostUploader = () => {
    const [showImoji, setshowImoji] = useState(false);
    const [selectedFiles, setselectedFiles] = useState('');
    let inputRef = useRef()
    // const [inputValue, setinputValue] = useState('');


    function handleChanger(e){
        let files =[... e.target.files];
        console.log(files)
        setselectedFiles(files)
        
    }

    function handleEmojiClicked(e){
        console.log(e)
        console.log(e.emoji)
      
        inputRef.current.value =  inputRef.current.value + e.emoji
        // setinputValue()
    }

    // function handleInputChanger(e){
    //     console.log(e.target.value)
    //     setinputValue(e.target.value)
    // }

    const handleRemove = (obj , i)=>{
      let copyArr = [...selectedFiles];
      copyArr.splice(i,1);
      setselectedFiles(copyArr)
    }

    // console.log("cloudName = ",import.meta.env.VITE_CLOUDNAME)
    console.log("preset = ",import.meta.env.VITE_UPLOAD_PRESET)

    const handleSubmit = async()=>{
        let arr = [...selectedFiles];
        
      let ansArr =  arr.map(async(ele,i)=>{
              let formData = new FormData();
              formData.append('file',ele);
              formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESET)
          let res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/upload`,formData)

            return res.data.secure_url
        })

        let solvedPromises = await Promise.all(ansArr)
        console.log(solvedPromises)

        let obj ={
          title: inputRef.current.value,
          files:solvedPromises
        }

        console.log(obj)
    }
  return (
    <div className=''>
        <div className='w-[400px] relative h-max p-3 mt-[30px] rounded-md border m-auto'>
            <div className='flex gap-2 items-center'>
                <img src="https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg" alt=""  className='w-12 h-12 rounded-full'/>
                <textarea ref={inputRef} className='border w-full p-3 rounded-xl' name="" id="" placeholder="what's in your mind.."></textarea>
            </div>

            {selectedFiles &&<div className='flex gap-2 flex-wrap my-6 '>
                  {
                    selectedFiles.map((ele,i)=>{
                      return ele.type.includes('image') ?<div className='relative'>
                         <img className='w-[150px] h-[150px]' src={URL.createObjectURL(ele)} alt="" />
                         <IoMdClose onClick={()=>handleRemove(ele,i)} size={20} className='cursor-pointer absolute right-1 bottom-full'/>
                      </div>
                      :
                     <div className='relative'>
                       <video controls className='w-[150px] h-[150px]' src={URL.createObjectURL(ele)}></video>
                        <IoMdClose onClick={()=>handleRemove(ele,i)} size={20} className='cursor-pointer absolute right-1 bottom-full'/>
                     </div>
                    })
                  }
              
            </div>}

            <div className='mt-5 flex justify-between gap-4 items-center'>
                <input   multiple onChange={handleChanger} hidden id='files' type="file" />
                <label className='bg-green-800 text-white rounded-md px-4 py-2 text-center' htmlFor="files">Image/Video</label>


                <MdEmojiEmotions  onClick={()=>setshowImoji(!showImoji)} size={25} color='green'/>
                <button onClick={handleSubmit} className='bg-[#0f0f2e] hover:bg-[#29294b] text-white px-4 cursor-pointer py-2 rounded '>post</button>
            </div>
                <EmojiPicker onEmojiClick={handleEmojiClicked} className='absolute' open={showImoji} searchDisabled={true}/>
        </div>
    </div>
  )
}

export default PostUploader
