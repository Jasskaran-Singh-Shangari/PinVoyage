import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center h-[100vh] bg-blue-300'>
        <SignIn signUpUrl='/register' />
    </div>
  )
}

export default LoginPage;
