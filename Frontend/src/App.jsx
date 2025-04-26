import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map, {Marker, Popup, FullscreenControl} from 'react-map-gl/mapbox';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import CircleIcon from '@mui/icons-material/Circle';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios"
import {format} from "timeago.js"
import Pins from '../../Backend/src/models/Pins.model';
import Navbar from './components/Navbar';


function App() {
  const [pins, setPins]=useState([])
  const [hoverId, setHoverId]=useState(null)
  const [title, setTitle]=useState(null)
  const [desc, setDesc]=useState(null)
  const [rating, setRating]=useState(0)
  useEffect(()=>{
    const getPins=async ()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/pins`)
        setPins(res.data)
      }
      catch(error){
        console.log(`Error while fetching the data: ${error}`)
      }
    }
    getPins()
  }, [])
  const [viewport, setViewport] = useState({
    longitude: 76.78,
    latitude: 30.73,
    zoom: 12
  });
  const [showPopup,setShowPopup]=useState(false)
  const currentUser="John"
  const [newPlace, setNewPlace]=useState(null)
  
  const handleAddClick=(e)=>{
    const long=e.lngLat.lng
    const lat=e.lngLat.lat
    // console.log(long, lat)
    setNewPlace({
      long, 
      lat
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const newPin={
      username:currentUser,
      title,
      desc,
      rating,
      long:newPlace.long,
      lat:newPlace.lat
    }
    try{
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/pins/`, newPin)
      setPins([...pins, res.data])
      console.log(res.data.rating)
    }
    catch(error){
      console.log("Something went wrong....")
    }
    
  }

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
      initialViewState={viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/rebel-osuda/cm9vdpp4y002h01r13j8i9l95"
      onMove={nextViewport => setViewport(nextViewport.viewState)} 
      onDblClick={handleAddClick}
    >
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
          color: p.username===currentUser?"tomato":"slateblue", 
          cursor:"pointer" }}  
          />
          {
            showPopup && p._id===hoverId && <Popup longitude={p.long} latitude={p.lat}
            anchor="left" onClose={()=>{setShowPopup(false)}}>
                          <div className='card flex flex-col justify-around mx-3'>
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
                            <Rating name="size-medium" defaultValue={p.rating} readOnly />
                            <label className='text-red-600 text-lg label'>Information</label>
                            <span className='username text-[14px]'>Created by<span className='font-semibold text-blue-800'>{p.username}</span></span>
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
      onClose={()=>{setNewPlace(null)}}>
        <div>
          <form onSubmit={handleSubmit} className='flex flex-col w-[250px] h-[300px] justify-between'>
            <label className='label'>Title</label>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" className='border-2 border-black border-solid rounded-3xl p-2' placeholder="Enter the location..." />
            <label className='label'>Reiew</label>
            <textarea onChange={(e)=>setDesc(e.target.value)} className='border-2 border-black border-solid rounded-2xl p-2' placeholder='Share your experience...' />
            <label className='label'>Rating</label>
            {/* <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> */}
            <Rating onChange={(e)=>setRating(e.target.value)} className='' name="size-medium" defaultValue={2} />
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
