import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FcCalendar, FcClock, FcPortraitMode, FcComments } from 'react-icons/fc';
import { CiEdit } from 'react-icons/ci';
import { MdDelete, MdRestore } from 'react-icons/md'; 
import {BiCommentAdd} from 'react-icons/bi'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API_BASE_URL from '../api';

function Article() {
  let {register,handleSubmit}=useForm()
  let { currentUser } = useSelector((state) => state.userlogin)
  const location = useLocation(); 
  const state=location.state || {title: "", content: "", category: "", DateOfCreation: "", DateOfModification: "", comments: [], status: true}
  const [commentStatus,setCommentStatus]=useState("")
  const [articleEditStatus,setArticleEditStatus]=useState(false)
  const [editedArticle,setEditedArticle]=useState(state)
  const [articleViewStatus,setArticleViewStatus]=useState(state.status)
  let [errorMessage,setErrorMessage]=useState("")
  let navigate=useNavigate()
  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(`/user-api/comment/${state.articleId}`,commentObj);
    if (res.data.message === "Comment added") {
      setCommentStatus(res.data.message);
      setEditedArticle((prev) => ({
        ...prev,
        comments: [...prev.comments, commentObj],
      }))
    } else {
      setErrorMessage(res.data.message);
    }
  };

  const saveArticle=async(formArticle)=>{
    const modifiedArticle={...state,...formArticle}
    delete modifiedArticle._id
    modifiedArticle.DateOfModification=new Date()
    let res=await axiosWithToken.put('/author-api/article',modifiedArticle)
    if(res.data.message==='article modified'){
      setArticleEditStatus(false)
      setEditedArticle(res.data.payload)
      navigate(`/authorprofile/article/${state.articleId}`,{state:res.data.payload})
    }
  }

  const deleteArticleById=async()=>{
    let copy={...editedArticle}
    delete copy._id
    let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,copy)
    if(res.data.message==='article deleted'){
      setArticleViewStatus(false)
    }
  }

  const restoreArticleById=async()=>{
    let copy={...editedArticle}
    delete copy._id
    let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,copy)
    if(res.data.message==='article restored'){
      setArticleViewStatus(true)
    }
  }

  return (
    <section className='article-shell page-shell'>
      <div className='glass-panel p-4 p-lg-5'>
        {articleEditStatus ? (
          <form onSubmit={handleSubmit(saveArticle)}>
            <div className='mb-4'>
              <label htmlFor="title" className='field-label'>Title</label>
              <input type="text" id='title' className='field-input' {...register('title')} defaultValue={state.title} /> 
            </div>
            <div className='mb-4'>
              <label htmlFor="category" className='field-label'>Category</label>
              <select className='field-select' id="category" {...register('category')} defaultValue={state.category} >
                <option value="" disabled>select a category</option>
                <option value="programming">Programming</option>
                <option value="science">Science</option>
                <option value="stockmarket">Stock Market</option>
                <option value="yoga">Yoga</option>
              </select>   
            </div>
            <div className='mb-4'>
              <label htmlFor="content" className='field-label'>Content</label>
              <textarea className='field-textarea' id="content" rows="10" {...register('content')} defaultValue={state.content} />
            </div>
            <div className='text-end'>
              <button type='submit' className='primary-btn'>Save changes</button>
            </div>
          </form>
        ) : (
          <>
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4">
              <div>
                <div className='brand-pill mb-3'>{editedArticle.category || 'Article'}</div>
                <p className="display-4 me-4 text-white">{editedArticle.title}</p>
                <div className="d-flex flex-wrap gap-3">
                  <small className="article-meta">
                    <FcCalendar className="fs-4" /> Created on:{new Date(editedArticle.DateOfCreation).toLocaleString()}
                  </small>
                  <small className="article-meta">
                    <FcClock className="fs-4" /> Modified on:{new Date(editedArticle.DateOfModification).toLocaleString()}
                  </small>
                </div>
              </div>
              {currentUser.userType === "author" && (
                <div className='d-flex gap-2'>
                  <button className="secondary-btn" onClick={() => setArticleEditStatus(true)} type="button">
                    <CiEdit className="fs-2" />
                  </button>
                  {articleViewStatus===true ? (
                    <button className="ghost-btn" style={{borderColor:'rgba(248, 113, 113, 0.35)', color:'#fecaca'}} onClick={deleteArticleById} type="button">
                      <MdDelete className="fs-2" />
                    </button>
                  ) : (
                    <button className='primary-btn' onClick={restoreArticleById} type="button">
                      <MdRestore className='fs-2'/>
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="lead mt-4 text-white">{editedArticle.content}</p>

            <div className="comments my-4">
              {errorMessage && <p className="error-state">{errorMessage}</p>}
              {Array.isArray(editedArticle?.comments) && editedArticle.comments.length > 0 ? (
                editedArticle.comments.map((commentObj, ind) => (
                  <div key={ind} className="glass-panel p-3 p-lg-4 mb-3">
                    <p className="fs-4 mb-2">
                      <FcPortraitMode className="fs-2 me-2" />
                      {commentObj.username}
                    </p>
                    <p className="ps-4 mb-0 section-copy">
                      <FcComments className="me-2" />
                      {commentObj.comments}
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-state">No comments yet.</p>
              )}
            </div>

            <div>
              {commentStatus && <p className='brand-pill mb-3'>{commentStatus}</p>}
              {currentUser?.userType === "user" && (
                <form onSubmit={handleSubmit(postComment)}>
                  <textarea
                    {...register("comments")}
                    className="field-textarea mb-4"
                    rows="4"
                    placeholder="Write a thoughtful comment..."
                  />
                  <button type="submit" className="primary-btn">
                    Add a Comment <BiCommentAdd className="fs-3" />
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );  
}

export default Article;
