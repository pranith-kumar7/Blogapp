import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'
import API_BASE_URL from '../api';
function Signup() {
    let { register, handleSubmit} = useForm();
    let [err, setErr] = useState("");
    let navigate = useNavigate();

    // Handle form submission
    async function handleFormSubmit(objData,event) {
        event.preventDefault()
            console.log("Form Data Before Sending:", objData);
        let res;
            if (objData.userType === 'user') {
                res = await axios.post(`${API_BASE_URL}/user-api/user`, objData);
            } if (objData.userType === 'author') {
                res = await axios.post(`${API_BASE_URL}/author-api/user`, objData);
            }
            if (res.data.message === 'user created' || 'author created') {
                console.log("✅ Navigating to /signin...");
                navigate("/signin");
            } else {
                setErr(res.data.message);   
                }
    }
    return (
        <div className='signup-container'>
            <div className='card container rounded-4 bg-dark mt-5 h-75 w-50 text-center'>
                <div className='card-header bg-dark text-info fs-5 fw-bolder'>
                    SignUp  
                </div>
                <div className='card-body'>
                    {/* User register error */}
                    {err.length!==0 && <p className='text-danger text-center'>{err}</p>}
                    
                    <form className='mx-auto w-50' onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className='d-flex align-items-center gap-3 mb-3'>
                            <label className='form-label mb-0 text-white'>Register As :</label>
                            <div className="form-check">   
                                <input type="radio" id="user" className="form-check-input" value="user" {...register('userType')} />
                                <label htmlFor="user" className="form-check-label text-white ms-1">User</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" id="author" className="form-check-input" value="author" {...register('userType')}/>
                                <label htmlFor="author" className="form-check-label text-white ms-1">Author</label>
                            </div>
                        </div>
                        <label className='form-label d-flex justify-content-start text-white'>Username :</label>
                        <input type='text' className='form-control mt-3 mb-3' placeholder='Username' 
                            {...register('username')} />
                        <label className='form-label d-flex justify-content-start text-white'>Password :</label>
                        <input type='password' className='form-control mt-3 mb-3' 
                            {...register('password')} />
                        <label className='form-label d-flex justify-content-start text-white'>Email :</label>
                        <input type='email' className='form-control mt-3 mb-3' 
                            {...register('email')} />
                        <button className='mt-5 btn w-50 btn-info d-block mx-auto' type='submit'>Register</button>
                    </form> 
                </div>
            </div>
        </div>
    );
}

export default Signup;
