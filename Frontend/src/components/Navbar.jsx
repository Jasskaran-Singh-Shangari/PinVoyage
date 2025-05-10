import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { SearchBox } from '@mapbox/search-js-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThemeContext  from '../Context/ThemeContext';



const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const savedTheme=localStorage.getItem("theme")
  const {setTheme}=useContext(ThemeContext)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='absolute top-[6px] right-[50px] flex gap-2 flex-row-reverse'>

          <button className="px-2 py-2 bg-blue-700 text-white rounded-full cursor-pointer shadow-lg hover:bg-red-700 hover:rotate-360 transition-all duration-[2s] w-[40px] h-[40px] flex items-center justify-center" 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" className='hover:rotate-y-360 '/></svg>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem value="mapbox://styles/rebel-osuda/cm9zcfcgc00xf01s5gnkbeivk" onClick={(e)=>{
          setTheme("mapbox://styles/rebel-osuda/cm9zcfcgc00xf01s5gnkbeivk")
          handleClose()
        }}>Sun Shine</MenuItem>
        <MenuItem value="mapbox://styles/rebel-osuda/cm9zf9vlc00mb01pgf2ea5sln" onClick={()=>{
          setTheme("mapbox://styles/rebel-osuda/cmaihway6010701r410z936mz")
          handleClose()
        }}>Nebula Night</MenuItem>
        <MenuItem value="mapbox://styles/rebel-osuda/cm9wc7omc004401se8fj7847h" onClick={()=>{
          setTheme("mapbox://styles/rebel-osuda/cm9wc7omc004401se8fj7847h")
          handleClose()
        }}>Origin Blue</MenuItem>
        <MenuItem value="mapbox://styles/rebel-osuda/cm9vdpp4y002h01r13j8i9l95" onClick={()=>{
          setTheme("mapbox://styles/rebel-osuda/cm9vdpp4y002h01r13j8i9l95")
          handleClose()
        }}>Dark Night</MenuItem>
      </Menu>

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
        {/* <SearchBox
          accessToken='pk.eyJ1IjoicmViZWwtb3N1ZGEiLCJhIjoiY205dWQzcndrMDhzcDJscHc4ZjVwcXB3OCJ9.Q0Sg84XjZwzC4vSy0MfvQQ'
          options={{
            language: 'en',
            country: 'IN'
          }}
    /> */}
    </div>
  )
}

export default Navbar
