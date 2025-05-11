import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react"
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import LoginPage from './routes/LoginPage.jsx'
import Register from './routes/Register.jsx'
import { ToastContainer, Zoom } from 'react-toastify';
import ThemeContextProvider from './Context/ThemeContextProvider.jsx'
import { SpeedInsights } from "@vercel/speed-insights/next"



const publishableKey=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!publishableKey){
  throw new Error(`Authentication not possible`)
}

const router = createBrowserRouter([{
  element: <MainLayout />,
  children:[
    {
      path: "/",
      element:<App /> 
    },
    {
      path:"/login",
      element: <LoginPage />
    },
    {
      path:"/register",
      element:<Register />
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <ClerkProvider publishableKey={publishableKey}>
        <ToastContainer position="top-center" pauseOnHover={false} theme="dark" autoClose="3000" transition={Zoom} />
        <RouterProvider router={router} />
      </ClerkProvider>
    </ThemeContextProvider>
    <SpeedInsights />
  </StrictMode>
)
