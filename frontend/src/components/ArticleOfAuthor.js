import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'

function ArticleOfAuthor() {
  const [articleList,setArtcilesList]=useState([])
  const [err,setErr]=useState('')
  let navigate=useNavigate()
  let {currentUser}=useSelector((state)=>state.userlogin)
  const token=sessionStorage.getItem('token')

  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

  useEffect(()=>{
    const getArticleOfCurrentAuthor=async()=>{
      let res=await axios.get(`${API_BASE_URL}/author-api/articles/${currentUser.username}`,{
        headers:{Authorization:`Bearer ${token}`},
      })
      if(res.data.message==='Articles'){
        setArtcilesList(res.data.payload)
      } else {
        setErr(res.data.message)
      }
    }

    if(currentUser?.username){
      getArticleOfCurrentAuthor()
    }
  },[currentUser?.username, token])

  return (
    <div>
      {err && <p className="error-state">{err}</p>}
      {articleList.length===0 ? (
        <p className='empty-state'>You have not published any articles yet.</p>
      ) : (
        <div className='article-grid mt-4'>
          {articleList.map((article)=>(
            <article className='glass-panel article-card' key={article.articleId}>
              <div className='brand-pill mb-3'>{article.status ? 'Published' : 'Archived'}</div>
              <h3>{article.title}</h3>
              <p className='section-copy mb-4'>{article.content.substring(0,120)}...</p>
              <button className='primary-btn' onClick={()=>readArticleByArticleId(article)}>
                Open article
              </button>
              <div className='article-meta mt-4'>
                Last updated on {new Date(article.DateOfModification).toLocaleString()}
              </div>
            </article>
          ))}
        </div>
      )}
      <Outlet/>
    </div>
  )
}

export default ArticleOfAuthor
