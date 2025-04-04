import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Authorprofile() {
  let {currentUser}=useSelector(state=>state.userlogin)
  return (
    <div className='bg-black p-3'> 
        <ul className='nav justify-content-around fs-3'>
          <li className='nav-item'><NavLink className='fs-4 text-info fw-bold nav-link mt-4' to={`articleofauthor/${currentUser.username}`} >ArticleOfAuthor</NavLink>
          </li>
          <li className='nav-item'><NavLink className='fs-4 text-info fw-bold nav-link mt-4' to='new-article'>AddArticle</NavLink>
          </li>
        </ul>
         <div className='bg-black' style={{minHeight:'100vh'}} >
          <Outlet />
        </div>
    </div>
  )
}

export default Authorprofile