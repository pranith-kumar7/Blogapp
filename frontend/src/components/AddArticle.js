import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'

function AddArticle() {
  let {register,handleSubmit}=useForm()
  let {currentUser}=useSelector((state)=>state.userlogin)
  let [err,setErr]=useState("")
  let navigate=useNavigate()

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

    let res=await axiosWithToken.post('/author-api/new-article',newarticle)
    if(res.data.message==='New article added'){
      navigate(`/authorprofile/articleofauthor/${currentUser.username}`)
    } else {
      setErr(res.data.message)
    }
  }

  return (
    <div className='glass-panel p-4 p-lg-5'>
      <div className='mb-4'>
        <div className='brand-pill mb-2'>New Story</div>
        <h2 className='mb-2'>Write and publish a new article</h2>
        <p className='section-copy mb-0'>Draft clearly, assign a category, and publish straight to your author workspace.</p>
      </div>
      <form className='pb-3' onSubmit={handleSubmit(addnewArticle)}>
        <div className='mb-4'>
          <label htmlFor="title" className='field-label'>Title</label>
          <input type="text" id='title' className='field-input' placeholder='Give your article a strong headline' {...register('title')} /> 
        </div>
        <div className='mb-4'>
          <label htmlFor="category" className='field-label'>Category</label>
          <select className='field-select' id="category" defaultValue="" {...register('category')} >
            <option value="" disabled>Choose a category</option>
            <option value="programming">Programming</option>
            <option value="science">Science</option>
            <option value="stockmarket">Stock Market</option>
            <option value="yoga">Yoga</option>
          </select>   
        </div>
        <div className='mb-4'>
          <label htmlFor="content" className='field-label'>Content</label>
          <textarea className='field-textarea' id="content" rows="10" placeholder='Write your article here...' {...register('content')} />
        </div>
        <div className='d-flex justify-content-end'>
          <button type='submit' className='primary-btn'>Publish article</button>
        </div>
      </form>
      {err && <p className="error-state mt-3 mb-0">{err}</p>}
    </div>
  )
}

export default AddArticle
