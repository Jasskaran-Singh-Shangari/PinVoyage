import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map, {Marker, Popup} from 'react-map-gl/mapbox';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import CircleIcon from '@mui/icons-material/Circle';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios"


function App() {
  const [pins, setPins]=useState([])
  useEffect(()=>{
    const getPins=async ()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_SERVER_URL}/pins`)
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
    zoom: 14
  });
  const [showPopup,setShowPopup]=useState(false)

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
      initialViewState={viewport}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/rebel-osuda/cm9vdpp4y002h01r13j8i9l95"
      onMove={nextViewport => setViewport(nextViewport.viewState)} 
    >
      {pins.map((p)=>(
        
        <Marker
        longitude={76.78}
        latitude={30.73}
        offsetLeft={-20}
        offsetTop={-10}
        >
        <div onMouseEnter={()=>setShowPopup(true)}
          onMouseLeave={()=>setShowPopup(false)}>
          < RoomIcon style={{ fontSize: viewport.zoom * 3, color: 'purple' }} 
          />
          {
            showPopup && <Popup longitude={76.78} latitude={30.73}
            anchor="left" onClose={()=>{setShowPopup(false)}}>
                          <div className='card flex flex-col justify-around mx-3'>
                            <label className='text-red-600 text-lg'>Place</label>
                            <h4 className='place font-bold text-lg'>Chandigarh</h4>
                            <label className='text-red-600 text-lg'>Review</label>
                            <p className='text-[14px]'>Beautiful place. I like it.</p>
                            <label className='text-red-600 text-lg'>Rating</label>
                            <div className='stars'>
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                              <StarIcon className='star text-yellow-400' />
                            </div>
                            <label className='text-red-600 text-lg'>Information</label>
                            <span className='username text-[14px]'>Created by<span className='font-semibold text-blue-800'>John Doe</span></span>
                            <span className='date font-medium text-gray text-[12px]'>1 hour ago</span>
                          </div>
                          </Popup>
          }
        </div>
        </Marker>
      ))}
    </Map>
  );
}

export default App
