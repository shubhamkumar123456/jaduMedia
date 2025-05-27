import React from 'react'

const FriendProfile = () => {
  return (
    <div className='container m-auto'>
        <div className="cover relative w-full h-[50vh]">
            <img className='w-full h-full' src="https://static.vecteezy.com/system/resources/previews/020/548/852/non_2x/blank-background-with-floral-frame-abstract-for-wallpaper-card-greeting-poster-design-cover-invitation-dark-color-free-vector.jpg" alt="" />

            <div className="profile w-[200px] h-[200px] rounded-full absolute bottom-[-20%] left-[5%]">
                <img className='w-full h-full rounded-full' src="https://ambicawallpaper.com/wp-content/uploads/2024/04/ADHYA-1-WS-261007.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default FriendProfile
