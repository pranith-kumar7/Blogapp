import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'

function Articles() {
  const [articleList,setArticlesList]=useState([])
  const [err,setErr]=useState('')
  let navigate=useNavigate()
  let token=sessionStorage.getItem('token')

  useEffect(()=>{
    const getArticles=async()=>{
      let res=await axios.get(`${API_BASE_URL}/user-api/articles`,{
        headers:{Authorization:`Bearer ${token}`},
      })
      if(res.data.message==='All Articles') {
        setArticlesList(res.data.payload)
      } else {
        setErr(res.data.message)
      }
    }

    getArticles()
  },[token])

  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

  return (
    <div>
      {err && <p className="error-state">{err}</p>}
      {articleList.length===0 ? (
        <p className='empty-state'>No articles are available yet.</p>
      ) : (
        <div className='article-grid mt-4'>
          {articleList.map((article) => (
            <article className='glass-panel article-card' key={article.articleId}>
              <div className='brand-pill mb-3'>{article.category || 'Featured story'}</div>
              <h3>{article.title}</h3>
              <p className='section-copy mb-4'>{article.content.substring(0,120)}...</p>
              <button className='primary-btn' onClick={()=>readArticleByArticleId(article)}>
                Read article
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

export default Articles
