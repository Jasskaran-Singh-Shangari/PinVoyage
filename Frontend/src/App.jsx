import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map, {Marker, Popup, FullscreenControl} from 'react-map-gl/mapbox';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import CircleIcon from '@mui/icons-material/Circle';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios"
import {format} from "timeago.js"


function App() {
  const [pins, setPins]=useState([])
  const [hoverId, setHoverId]=useState(null)
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
        offsetLeft={-20}
        offsetTop={-10}
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
                            <label className='text-red-600 text-lg'>Place</label>
                            <h4 className='place font-bold text-lg'>{p.title}</h4>
                            <label className='text-red-600 text-lg'>Review</label>
                            <p className='desc text-[14px]'>{p.desc}</p>
                            <label className='text-red-600 text-lg rating'>Rating</label>
                            <div className='stars'>
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                            </div>
                            <label className='text-red-600 text-lg'>Information</label>
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
        Hello
      </Popup>}
      <FullscreenControl />
    </Map>
  );
}

export default App
