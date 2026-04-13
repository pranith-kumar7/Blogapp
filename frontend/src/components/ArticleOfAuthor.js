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
    let {currentUser}=useSelector(
        (state)=>state.userlogin
    )
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
            }
            else{
               setErr(res.data.message)
            }
        }

        if(currentUser?.username){
            getArticleOfCurrentAuthor()
        }
    },[currentUser?.username, token])

  return (
    <div>
        {err && <p className="text-danger text-center">{err}</p>}
        {articleList.length===0?(<p className='display-1 text-warning text-center'>No Articles found</p>):(
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5'>
            {articleList.map((article)=>( <div className='col' key={article.articleId}>
                <div className='card h-100'>
                    <div className='card-body'>
                        <h5 className='card-title'>{article.title}</h5>
                        <p className='card-text'>
                            {article.content.substring(0,80)+"...."}
                        </p>
                        <button className='custom btn btn-4'onClick={()=>readArticleByArticleId(article)}>
                            <span>read more</span>
                        </button>
                    </div>
                    <div className='card-footer'>
                        <small className='text-body-secondary'>
                            Last updated on {new Date(article.DateOfModification).toLocaleString()}
                        </small>
                    </div>
                </div>
            </div>
            ))}
            </div>
        )}
        <Outlet/>
    </div>
  )
}

export default ArticleOfAuthor
