import React from 'react';
import { useState } from 'react';
import { login } from '../services/notes';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({isError: false, message: ''});
  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value});
  }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.email === '' || user.password === '') {
      setError({isError: true, message: 'user or password is invalid'});
      return;
    }else {
      setError({isError: false, message: ''});
    }
    login(user.email, user.password)
      .then(data => {
        if(data) {
          navigate('/notes')
        }
      })
      .catch(err => {
        setError({isError: true, message: err.response.data.message});
      })
  }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl mb-5 font-medium text-slate-500'>Login</h2>
      <form action="" className=' bg-slate-200 p-10 rounded-md shadow-lg' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor="user" className='text-slate-400'>
            Username
            <input 
              type="text" 
              placeholder='username' 
              value={user.email} 
              name='email'
              id='user' 
              className='ml-3 px-2 py-2 rounded-sm text-zinc-600 bg-slate-300 outline-none' 
              onChange={handleChange}
              />
          </label>
        </div>
        <div>
          <label htmlFor="password" className='text-slate-400'>
            Password
            <input 
              type="password" 
              id='password' 
              placeholder='*****' 
              name='password'
              value={user.password} 
              className='ml-4 px-2 py-2 rounded-sm text-zinc-600 bg-slate-300 outline-none'
              onChange={handleChange}
              />
          </label>
        </div>
        {error.isError && (
          <div className='mt-4 bg-red-500 p-1'>
            <p className='text-cyan-100 text-center'>{error.message}</p>
          </div>
        )}
        <div className='flex justify-center mt-4'>
          <button className='bg-indigo-500 text-cyan-50 rounded-md px-4 py-2'>Sing In</button>
        </div>
      </form>
    </div>
  )
}
