import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Register = () => {
  return (
    <div className='flex items-center justify-center h-[100vh] bg-blue-300'>
      <SignUp signInUrl='/login' />
    </div>
  )
}

export default Register
