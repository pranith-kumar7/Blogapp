import React from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginThunk } from '../redux/slices/userloginslice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signin.css'

function Signin() {
  let { register, handleSubmit} = useForm();
  let dispatch=useDispatch()
  let navigate=useNavigate()
  const {currentUser,loginStatus,errorStatus,errorMessage,isPending}=useSelector(state=>state.userlogin)

  function handleFormSubmit(creduser){
    let actionObj=userLoginThunk(creduser)
    dispatch(actionObj)
  }

  useEffect(()=>{
    if(loginStatus===true){
      if(currentUser?.userType==='user'){
        navigate('/userprofile/articles')
      }
      if(currentUser?.userType==='author'){
        navigate('/authorprofile')
      }
    }
  },[loginStatus, currentUser?.userType, navigate])

  return (
    <section className='auth-shell page-shell'>
      <div className='row g-4 align-items-stretch'>
        <div className='col-lg-5'>
          <div className='glass-panel h-100 p-4 p-lg-5'>
            <div className='brand-pill mb-3'>Welcome back</div>
            <h1 className='section-title'>Access your editorial workspace.</h1>
            <p className='section-copy'>Sign in as a reader to discover stories or as an author to manage and publish your work.</p>
          </div>
        </div>
        <div className='col-lg-7'>
          <div className='glass-panel p-4 p-lg-5'>
            <h2 className='mb-4'>Sign in</h2>
            {errorStatus && <p className='error-state mb-4'>{errorMessage}</p>}
            <form onSubmit={handleSubmit(handleFormSubmit)} >
              <div className='d-flex flex-wrap gap-3 mb-4' style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
                <label className='brand-pill'>
                  <input type="radio" id="user" value="user" {...register('userType')} />
                  User
                </label>
                <label className='brand-pill'>
                  <input type="radio" id="author" value="author" {...register('userType')} />
                  Author
                </label>
              </div>
              <div className='mb-3'>
                <label className='field-label'>Username</label>
                <input type='text' className='field-input' placeholder='Enter your username' {...register('username')} />
              </div>
              <div className='mb-4'>
                <label className='field-label'>Password</label>
                <input type='password' className='field-input' placeholder='Enter your password' {...register('password')} />
              </div>
              <button className='primary-btn' type='submit' disabled={isPending}>
                {isPending ? 'Signing in...' : 'Login'}
              </button>
              <p className='section-copy mt-4 mb-0'>Don't have an account? <Link className='text-info text-decoration-none fw-bold' to="/signup">Create one</Link></p>
            </form> 
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin
