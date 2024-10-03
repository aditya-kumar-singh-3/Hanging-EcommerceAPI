
import React from 'react';

const LoginContent = () => {
  return (
    <>
     <div className='bg-blue-500 min-w-full min-h-screen  flex items-center justify-center'>
        <form>
       <div className='border border-white h-500 w-450 '>
        <p className='text-center text-5xl font-bold mt-2'>Login</p>
        <div className='ml-5'>
        <input type='text' placeholder='First Name' className='text-black mt-10 p-2 rounded-full ' />
        <input type='text' placeholder='Last Name' className=' text-black ml-4 p-2 rounded-full '/>
        </div>
        <div className='flex flex-col p-4 '>
            <input type='text' placeholder='Username' className='p-2 rounded-full'/>
            <input type='password' placeholder='Passoword' className='mt-5 p-2 rounded-full'/>
        </div>
       </div>
       </form>
     </div>
    </>
  );
}

export default LoginContent;
