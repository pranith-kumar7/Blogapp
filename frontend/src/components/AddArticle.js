import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* import {axiosWithToken} from '../axiosWithToken' */
import axios from 'axios'
import API_BASE_URL from '../api'
function AddArticle() {
       

        let {register,handleSubmit}=useForm()
        let {currentUser}=useSelector(
            (state)=>state.userlogin
        )
        let [err,setErr]=useState("")
        let navigate=useNavigate()
        function postSuceess(obj){
            navigate('/authorprofile')
        }

        let token=sessionStorage.getItem('token')
        const axiosWithToken=axios.create({
        baseURL: API_BASE_URL,
        headers:{Authorization:`Bearer ${token}`}
        })

        const addnewArticle=async(newarticle)=>{
            newarticle.articleId=Date.now()
            newarticle.DateOfCreation=new Date()
            newarticle.DateOfModification=new Date()
            newarticle.username=currentUser.username
            newarticle.comments=[]
            newarticle.status=true

        //make http post req 
        let res=await axiosWithToken.post('/author-api/new-article',newarticle)
        if(res.data.message==='New article added'){
            //navigate for articlesby author component
            navigate(`/authorprofile/articleofauthor/${currentUser.username}`)
        }
        else{
                setErr(res.data.message)
        }

    }

  return (
    <div>
        <div className='container w-75 bg-white rounded-4'>
            <div className='row justify-content-center mt-5'>
                <div className='col-lg-8 col-md-8 col-sm-10'>   
                    <div className='card-shadow'>
                        <div className='card-title text-center border-bottom'>
                            <h2 className='p-3'>Write an Article</h2>
                        </div>  
                        <div className='card-body bg-light'>
                            <form className='pb-3' onSubmit={handleSubmit(addnewArticle)}>
                                <div className='mb-4'>
                                    <label htmlFor="title" className='form-label'>Title</label>
                                    <input type="text" id='title' className='form-control' {...register('title')} /> 
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="category" className='form-label'>Category</label>
                                    <select className='form-select' id="category" {...register('category')} >
                                            <option value="" selected disabled>select a category</option>
                                            <option value="programming">Programming</option>
                                             <option value="science">Science</option>
                                            <option value="stockmarket">Stock Market</option>
                                            <option value="yoga">Yoga</option>
                                    </select>   
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="content" className='form-label'>Content</label>
                                    <textarea className='form-control' id="content" rows="10" {...register('content')} ></textarea>
                                </div>
                                <div className='text-end pe-5'>
                                <button type='submit' className='text-center btn btn-success' onClick={postSuceess}  >Post</button>
                                </div>
                            </form>
                            {err && <p className="text-danger text-center mt-3">{err}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddArticle
