import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css'
import API_BASE_URL from '../api';

function Signup() {
  let { register, handleSubmit} = useForm();
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  async function handleFormSubmit(objData,event) {
    event.preventDefault()
    let res;
    if (objData.userType === 'user') {
      res = await axios.post(`${API_BASE_URL}/user-api/user`, objData);
    }
    if (objData.userType === 'author') {
      res = await axios.post(`${API_BASE_URL}/author-api/user`, objData);
    }
    if (res.data.message === 'user created' || res.data.message === 'author created') {
      navigate("/signin");
    } else {
      setErr(res.data.message);   
    }
  }

  return (
    <section className='auth-shell page-shell'>
      <div className='row g-4 align-items-stretch'>
        <div className='col-lg-5'>
          <div className='glass-panel h-100 p-4 p-lg-5'>
            <div className='brand-pill mb-3'>Start publishing</div>
            <h1 className='section-title'>Create a reader or author account in one step.</h1>
            <p className='section-copy'>Readers can explore and comment. Authors get tools to publish, update, and manage their articles.</p>
          </div>
        </div>
        <div className='col-lg-7'>
          <div className='glass-panel p-4 p-lg-5'>
            <h2 className='mb-4'>Create account</h2>
            {err.length!==0 && <p className='error-state mb-4'>{err}</p>}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='d-flex flex-wrap gap-3 mb-4' style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
                <label className='brand-pill'>
                  <input type="radio" id="user" value="user" {...register('userType')} />
                  User
                </label>
                <label className='brand-pill'>
                  <input type="radio" id="author" value="author" {...register('userType')}/>
                  Author
                </label>
              </div>
              <div className='mb-3'>
                <label className='field-label'>Username</label>
                <input type='text' className='field-input' placeholder='Choose a username' {...register('username')} />
              </div>
              <div className='mb-3'>
                <label className='field-label'>Password</label>
                <input type='password' className='field-input' placeholder='Create a secure password' {...register('password')} />
              </div>
              <div className='mb-4'>
                <label className='field-label'>Email</label>
                <input type='email' className='field-input' placeholder='name@example.com' {...register('email')} />
              </div>
              <button className='primary-btn' type='submit'>Register</button>
              <p className='section-copy mt-4 mb-0'>Already have an account? <Link className='text-info text-decoration-none fw-bold' to="/signin">Sign in</Link></p>
            </form> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
