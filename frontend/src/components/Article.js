import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FcCalendar, FcClock, FcPortraitMode, FcComments } from 'react-icons/fc';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { MdRestore } from 'react-icons/md'; 
import {BiCommentAdd} from 'react-icons/bi'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API_BASE_URL from '../api';

function Article() {
  let {register,handleSubmit}=useForm()
  let { currentUser } = useSelector((state) => state.userlogin)
  const location = useLocation(); 
  const state=location.state || {title: "", content: "", category: "", DateOfCreation: "", DateOfModification: "", comments: []}
  const [commentStatus,setCommentStatus]=useState("")
  const [articleEditStatus,setArticleEditStatus]=useState(false)
  const [editedArticle,setEditedArticle]=useState(state)
  const [articleViewStatus,setArticleViewStatus]=useState(state.status)
  let [err,setErr]=useState("")
   
  let navigate=useNavigate()

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(
      `/user-api/comment/${state.articleId}`,commentObj);
    if (res.data.message === "Comment added") {
      setCommentStatus(res.data.message);
          // Instead of replacing, append the new comment
    setEditedArticle((prev) => ({
      ...prev,
      comments: [...prev.comments, commentObj], // Append the new comment
    }))} else {
      setErr(res.data.message);
    }
  };
  const editArticle=()=>{
    setArticleEditStatus(true)
  }
  const saveArticle=async(editedArticle)=>{
    const modifiedArticle={...state,...editedArticle}
    delete modifiedArticle._id
    modifiedArticle.DateOfModification=new Date()
    //make http PUT
    let res=await axiosWithToken.put('/author-api/article',modifiedArticle)
    if(res.data.message==='article modified'){
      setArticleEditStatus(false)
      setEditedArticle(res.data.payload)
      navigate(`/authorprofile/article/${state.articleId}`,{state:res.data.payload})
    }
  }
  //delete article
  const deleteArticleById=async()=>{
    let copy={...editedArticle}
    delete copy._id
    let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,copy)
    if(res.data.message==='article deleted'){
      setArticleViewStatus(false)
    }
  }
  //restore article
  const restoreArticleById=async()=>{
    let copy={...editedArticle}
    delete copy._id
    let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,copy)
    if(res.data.message==='article restored'){
      setArticleViewStatus(true)
    }
  }

  return (
    <div>
      {/* Article Header */}
      {
        articleEditStatus===true?<form onSubmit={handleSubmit(saveArticle)}>
        <div className='mb-4'>
            <label htmlFor="title" className='form-label'>Title</label>
            <input type="text" id='title' className='form-control' {...register('title')} defaultValue={state.title} /> 
        </div>
        <div className='mb-4'>
            <label htmlFor="category" className='form-label'>Category</label>
            <select className='form-select' id="category" {...register('category')} defaultValue={state.category} >
                    <option value="" selected disabled>select a category</option>
                    <option value="programming">Programming</option>
                     <option value="science">Science</option>
                    <option value="stockmarket">Stock Market</option>
                    <option value="yoga">Yoga</option>
            </select>   
        </div>
        <div className='mb-4'>
            <label htmlFor="content" className='form-label'>Content</label>
            <textarea className='form-control' id="content" rows="10" {...register('content')} defaultValue={state.content} ></textarea>
        </div>
        <div className='text-end'>
        <button type='submit' className='text-center btn btn-success'>Save</button>
        </div>
    </form>
      :
      <>
      <div className="d-flex justify-content-between">
        <div>
          <p className="display-3 me-4 text-white">{editedArticle.title}</p>
          <span className="py-3">
            <small className="text-secondary me-4">
              <FcCalendar className="fs-4" /> Created on:{new Date(editedArticle.DateOfCreation).toLocaleString()}
            </small>
            <small className="text-secondary">
              <FcClock className="fs-4" /> Modified on:{new Date(editedArticle.DateOfModification).toLocaleString()}
            </small>
          </span>
        </div>
  
        {/* Edit and Delete Buttons */}
        {currentUser.userType === "author" && (
          <div>
            <button className="me-2 btn btn-warning" onClick={editArticle}>
              <CiEdit className="fs-2" />
            </button>
            {articleViewStatus===true?(
            <button className="me-2 btn btn-danger" onClick={deleteArticleById}>
              <MdDelete className="fs-2" />
            </button>):(
            <button className='me-2 btn btn-success' onClick={restoreArticleById}>
              <MdRestore className='fs-2'/>
            </button>)
            }
          </div>
        )}
      </div>
  
      {/* Article Content */}
      <p className="lead mt-3 text-white">{editedArticle.content}</p>
  
      {/* Comments Section */}
      <div className="comments my-4">
        {Array.isArray(state?.comments) && state.comments.length > 0 ? (
          state.comments.map((commentObj, ind) => (
            <div key={ind} className="bg-light p-3">
              <p className="fs-4">
                <FcPortraitMode className="fs-2 me-2" />
                {commentObj.username}
              </p>
              <p className="ps-4">
                <FcComments className="me-2" />
                {commentObj.comments}
              </p>
            </div>
          ))
        ) : (
          <p className="display-3">No comments yet...</p>
        )}
      </div>
  
      <div>
        <h1>{commentStatus}</h1>
      {/* Add Comment Section */}
      {currentUser?.userType === "user" && (
        <form onSubmit={handleSubmit(postComment)}>
          <input
            type="text"
            {...register("comments")}
            className="form-control mb-4"
            placeholder="Write a comment here..."
          />
          <button type="submit" className="btn btn-success">
            Add a Comment <BiCommentAdd className="fs-3" />
          </button>
        </form>
      )}
      </div>
      </>}
    </div>
  );  
}
export default Article;
