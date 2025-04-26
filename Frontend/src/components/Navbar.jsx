import React from 'react'
import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";



const Navbar = () => {
  return (
    <div className='absolute top-[6px] right-[50px]'>
        <SignedOut>
            <Link to="/login">
                <button className="px-2 py-2 bg-blue-700 text-white rounded-full cursor-pointer shadow-lg hover:bg-red-700 hover:rotate-360 transition-all duration-[2s] w-[40px] h-[40px] flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3" className='hover:rotate-x-360 transition-all duration-[2s]'><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg></button>
            </Link>
        </SignedOut>
        <SignedIn>
        <UserButton 
        appearance={{ 
          elements: { 
            userButtonAvatarBox: { 
              width: "40px", 
              height: "40px" 
              }, 
              },
              }} 
              />

        </SignedIn>
    </div>
  )
}

export default Navbar
