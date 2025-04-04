import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
function Userprofile() {
  return (
    <div className='p-3 bg-black'>
        <ul className='nav justify-content-around fs-3'>
            <li className='nav-item'><NavLink to='articles' className='fs-4 fw-bold text-info nav-link mt-4'>Articles</NavLink>
            </li>
        </ul>
        <div className='bg-black' style={{minHeight:'100vh'}} >
          <Outlet />
        </div>
    </div>
  )
}

export default Userprofile