import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'

function Userprofile() {
  return (
    <section className='profile-shell page-shell'>
      <div className='glass-panel p-4 p-lg-5'>
        <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4'>
          <div>
            <div className='brand-pill mb-2'>Reader Workspace</div>
            <h1 className='section-title mb-2'>Discover published articles</h1>
            <p className='section-copy mb-0'>Browse the latest stories and open any article to read the full piece and join the discussion.</p>
          </div>
          <div className='d-flex gap-2'>
            <NavLink to='articles' className='primary-btn text-decoration-none'>All articles</NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  )
}

export default Userprofile
