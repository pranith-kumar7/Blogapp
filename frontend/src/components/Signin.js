import React from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginThunk } from '../redux/slices/userloginslice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css'
function Signin() {

    let { register, handleSubmit} = useForm();
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const {currentUser,loginStatus}=useSelector(state=>state.userlogin)
 
      // Handle form submission
      function handleFormSubmit(creduser){
        let actionObj=userLoginThunk(creduser)
        dispatch(actionObj)
      };

      useEffect(()=>{
        if(loginStatus===true){
          if(currentUser?.userType==='user'){
          navigate('/Userprofile')
          }
          if(currentUser?.userType==='author'){
            navigate('/authorprofile')
            }
        }
      },[loginStatus, currentUser?.userType, navigate])

  return (
    <div className='signin-container'>
        <div className='sigincard card  container rounded-4 bg-dark mt-5 h-75 w-50 text-center'>
        <div className='card-header bg-dark text-info fs-5 fw-bolder'>
            SignIn  
        </div>
            <div className='card-body '>
                <form className='mx-auto w-50' onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className='d-flex align-items-center gap-3 mb-3'>
                        <label className='form-label mb-0 text-white'>Login As :</label>
                        <div className="form-check">   
                            <input type="radio" id="user" className="form-check-input" value="user" {...register('userType')} />
                            <label htmlFor="user" className="form-check-label text-white ms-1">User</label>
                        </div>
                        <div className="form-check ">
                            <input type="radio" id="author" className="form-check-input" value="author" {...register('userType')} />
                            <label htmlFor="author" className="form-check-label text-white ms-1">Author</label>
                        </div>
                    </div>
                    <label className='form-label d-flex justify-content-start text-white'>Username :</label>
                    <input type='text'  className='form-control mt-3 mb-3' placeholder='username'{...register('username')} />
                    <label className='form-label d-flex justify-content-start text-white'>Password :</label>
                    <input type='password' className='form-control mt-3 mb-3' {...register('password')} />
                    <button className='mt-5 btn btn-info w-50 d-block mx-auto' type='submit'>Login</button>
                    <p className='lead mt-4 text-white' >Don't have an account?<a style={{textDecoration:"none"}} className='px-2 fw-bold text-info' href="/signup">Signup</a></p>
                </form> 
            </div>
    </div>
    </div>
  )
}

export default Signin