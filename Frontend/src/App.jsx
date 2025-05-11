import { useEffect, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map, {Marker, Popup, FullscreenControl} from 'react-map-gl/mapbox';
import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import CircleIcon from '@mui/icons-material/Circle';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios"
import {format} from "timeago.js"
// import Pins from '../../Backend/src/models/Pins.model';
import Navbar from './components/Navbar';
// import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import ThemeContextProvider from './Context/ThemeContextProvider';
import ThemeContext  from './Context/ThemeContext';


function App() {
  const [pins, setPins]=useState([])
  const [userInfo, setUserInfo]=useState({})
  const [hoverId, setHoverId]=useState(null)
  const [title, setTitle]=useState(null)
  const [desc, setDesc]=useState(null)
  const [rating, setRating]=useState(0)
  const {isSignedIn, user, isLoaded}= useUser()
  const [currentUser,setCurrentUser]=useState()
  // const [mapTheme, setMapTheme]=useState()
  const {theme}=useContext(ThemeContext)
  const [l1, setL1]=useState()
  const [l2, setL2]=useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.longitude)
        console.log(position.coords.latitude)
        setL1(position.coords.longitude)
        setL2(position.coords.latitude)
        setViewport({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 12
        })
      },
      (error) => {
        console.log(`ERROR: ${error.message}`);
      }, 
      {
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0
      }
    
    );
  }, []);

  if (!viewport) {
    return <div>Loading map...</div>;
  }

  const a=null;

  useEffect(()=>{
    toast.info("Your location may be approximate.")
  }, [a])
  

  useEffect(()=>{
    const getPins=async ()=>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/pins/`)
        setPins(res.data)
      }
      catch(error){
        console.log(`Error while fetching the data: ${error}`)
      }
    }
    getPins()
  }, []) 

  // useEffect(()=>{
  //   console.log(theme)
  // }, [theme])

  // if (!isSignedIn){
  //   console.log(user)
  // }

  // const { getToken } = useAuth();

  //   const getUser = async () => {
  //     try {
  //       const token = await getToken(); 
  //       const user = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, 
  //         },
  //       });
  //       // console.log(user.data.color);
  //       setUser(user.data);
  //     } catch (error) {
  //       console.log(`ERROR: ${error}`);
  //     }
  //   }
  //   getUser()

  // if (isSignedIn){
  //   setCurrentUser(user.username)
  // }
  // else{
  //   setCurrentUser("Guest")
  // }

  useEffect(()=>{
    const getUser=async ()=>{
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/`, user)
        // console.log(data)
        setUserInfo(data)
        setCurrentUser(data.username)
      } catch (error) {
        console.log(`ERROR:${error}`)
      }
    }
    if (isSignedIn && user){
      getUser()
    }
  }, [isSignedIn])


  const [viewport, setViewport] = useState({
    longitude: 77.2088, // Default longitude 
    latitude: 28.6139,  // Default latitude 
    zoom: 12

  });

  const [showPopup,setShowPopup]=useState(false)
  const [newPlace, setNewPlace]=useState(null)
  const [signInMsg, setSignInMsg]=useState(false)
  
  const handleAddClick=(e)=>{
    if (isSignedIn) {
      const long=e.lngLat.lng
      const lat=e.lngLat.lat
      // console.log(long, lat)
      setNewPlace({
        long, 
        lat
      })
      setSignInMsg(false)
    }
    else{
      setSignInMsg(true)
      toast("Please Login")
    }
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const newPin={
      username:currentUser,
      title,
      desc,
      rating,
      long:newPlace.long,
      lat:newPlace.lat,
      color: userInfo.color
    }
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/pins/`, newPin)
      setPins([...pins, res.data])
      // console.log(res.data.rating)
    }
    catch(error){
      console.log("Something went wrong....")
    }
  }

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
      viewState={viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle={ localStorage.getItem("theme") || "mapbox://styles/rebel-osuda/cm9zcfcgc00xf01s5gnkbeivk" }
      onMove={nextViewport => setViewport(nextViewport.viewState)} 
      onDblClick={handleAddClick}
    >
      {
        <Marker 
          longitude={l1 || 77.2088}
          latitude={l2 || 28.6139}
          offsetLeft={-viewport.zoom * 1.5}
          offsetTop={-viewport.zoom * 3}
        >
        <PersonPinRoundedIcon onHover={()=>{}}
          style={{ fontSize: viewport.zoom * 3, 
          color: "#00f", 
          cursor:"pointer",
          // boxShadow: "100px"
          }}  />
        </Marker>

      }
      {pins.map((p)=>(
        <Marker 
        key={p._id}
        longitude={p.long}
        latitude={p.lat}
        offsetLeft={-viewport.zoom * 1.5}
        offsetTop={-viewport.zoom * 3}
        >
        <div onMouseEnter={()=>{
          setHoverId(p._id)
          setShowPopup(true)}}
          onMouseLeave={()=>{
            setHoverId(null)
            setShowPopup(false)}}>
          < RoomIcon style={{ fontSize: viewport.zoom * 3, 
          color: p.color, 
          cursor:"pointer",
          // boxShadow:"100px" 
          }}  
          />
          {
            showPopup && p._id===hoverId && <Popup longitude={p.long} latitude={p.lat}
            anchor="left" onClose={()=>{setShowPopup(false)}}>
                          <div className='card flex flex-col justify-start mx-3 popup-box'>
                            <label className='text-red-600 text-lg label'>Place</label>
                            <h4 className='place font-bold text-lg'>{p.title}</h4>
                            <label className='text-red-600 text-lg label'>Review</label>
                            <p className='desc text-[14px]'>{p.desc}</p>
                            <label className='text-red-600 text-lg rating label'>Rating</label>
                            {/* <div className='stars'>
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                            </div> */}
                            <Rating name="size-medium" className='my-2' defaultValue={p.rating} readOnly />
                            <label className='text-red-600 text-lg label '>Information</label>
                            <span className='username text-[14px]'>Created by<span className='font-semibold text-blue-800'><span>  </span>{p.username}</span></span>
                            <span className='date font-medium text-gray text-[12px]'>{format(p.createdAt)}</span>
                          </div>
                          </Popup>
          }
        </div>
        </Marker>
      ))}
      {newPlace && <Popup 
      longitude={newPlace.long}
      latitude={newPlace.lat}
      anchor="left"
      onClose={()=>{setNewPlace(null)}}
      className=''>
        <div className='popup-box'>
          <form onSubmit={handleSubmit} className='flex flex-col w-[250px] h-[300px] justify-between text-lg'>
            <label className='label'>Title</label>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" className='p-2' placeholder="Enter the location..." />
            <label className='label'>Reiew</label>
            <textarea onChange={(e)=>setDesc(e.target.value)} className=' p-2' placeholder='Share your experience...' />
            <label className='label'>Rating</label>
            {/* <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> */}
            <Rating onChange={(e)=>setRating(e.target.value)} className='my-5' name="size-medium" defaultValue={2} />
            <button type="submit" className='bg-blue-500 text-white rounded-3xl px-4 py-2 hover:bg-blue-600 cursor-pointer' >Add Pin</button>
          </form>
        </div>
      </Popup>}
      {/* <div className='absolute top-0'>
        <button className='text-white bg-blue-600 px-4 py-2'>Login</button>
        <button className='text-white bg-red-600 px-4 py-2'>Register</button>
        <button className='text-white bg-green-600 px-4 py-2'>Logout</button>
      </div> */}
      <Navbar />
      <FullscreenControl />
    </Map>
  );
}

export default App
