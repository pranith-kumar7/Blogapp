import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Authorprofile() {
  let {currentUser}=useSelector(state=>state.userlogin)

  return (
    <section className='profile-shell page-shell'> 
      <div className='glass-panel p-4 p-lg-5'>
        <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4'>
          <div>
            <div className='brand-pill mb-2'>Author Workspace</div>
            <h1 className='section-title mb-2'>Manage your editorial pipeline</h1>
            <p className='section-copy mb-0'>Review your published work, update existing pieces, and draft new articles from one place.</p>
          </div>
          <div className='d-flex flex-wrap gap-2'>
            <NavLink className='ghost-btn text-decoration-none' to={`articleofauthor/${currentUser.username}`} >My articles</NavLink>
            <NavLink className='primary-btn text-decoration-none' to='new-article'>New article</NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  )
}

export default Authorprofile
