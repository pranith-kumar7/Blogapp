import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Articles() {
    const [articleList,setArticlesList]=useState([])
    const [err,setErr]=useState('')
    let navigate=useNavigate()
    let token=sessionStorage.getItem('token')
    const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`},
    })
    const getArticleOfCurrentAuthor=async()=>{
        let res=await axiosWithToken.get(`http://localhost:7000/user-api/articles`)
        if(res.data.message==='All Articles')
        {
            setArticlesList(res.data.payload)
        }else{
            setErr(res.data.message)
        }
    }

    useEffect(()=>{
        getArticleOfCurrentAuthor()
    },[])

    const readArticleByArticleId=(articleObj)=>{
        navigate(`../article/${articleObj.articleId}`,{state:articleObj})
    }

  return (
    <div>
        {err && <p className="text-danger text-center">{err}</p>}
        {articleList.length===0?(<p className='display-1 text-warning text-center'>No Articles found</p>):(
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5'>
            {articleList.map((article) => (<div className='col' key={article.articleId}>
                <div className='card h-100'>
                    <div className='card-body'>
                        <h5 className='card-title'>{article.title}</h5>
                        <p className='card-text'>
                            {article.content.substring(0,80)+"...."}
                        </p>
                        <button className='custom btn btn-4' onClick={()=>readArticleByArticleId(article)}>
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

export default Articles