import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import i from '../Assests/Icon.png'
import { useSelector,useDispatch } from 'react-redux'
import { resetState } from '../redux/slices/userloginslice'

function Navigation() {
  const {currentUser,loginStatus}=useSelector(state=>state.userlogin)
  let dispatch=useDispatch()

  function logOut(){
    sessionStorage.removeItem('token')
    let action=resetState()
    dispatch(action) 
  }

  return (
    <header className='page-shell pt-3'>
      <div className='glass-panel d-flex flex-column flex-lg-row align-items-lg-center justify-content-between px-3 px-lg-4 py-3 gap-3'>
        <Link className="d-flex align-items-center gap-3 text-decoration-none" to="/">
          <img className='rounded-circle border border-info-subtle' style={{width:"62px",height:"62px", objectFit:"cover"}} src={i} alt="Blog App logo" />
          <div>
            <div className='brand-pill mb-2'>Editorial Platform</div>
            <div className='fs-3 fw-bold text-white'>Blog App</div>
          </div>
        </Link>
        <nav className='d-flex flex-wrap align-items-center gap-2 gap-lg-3'>
          {loginStatus===false ? (
            <>
              <NavLink className="ghost-btn" to="/home">Home</NavLink>
              <NavLink className="ghost-btn" to="/signup">Create account</NavLink>
              <NavLink className="primary-btn" to="/signin">Sign in</NavLink>
            </>
          ) : (
            <>
              <div className='px-3 py-2 rounded-pill' style={{background:'rgba(125, 211, 252, 0.08)', border:'1px solid rgba(125, 211, 252, 0.18)', fontFamily:'Arial, Helvetica, sans-serif'}}>
                <span className='fw-bold text-white'>{currentUser.username}</span>
                <span className='ms-2 text-info text-capitalize'>{currentUser.userType}</span>
              </div>
              <Link className="ghost-btn text-decoration-none" to={currentUser.userType === 'author' ? '/authorprofile' : '/userprofile/articles'}>
                Workspace
              </Link>
              <Link className="secondary-btn" to="/" onClick={logOut}>
                Sign out
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navigation
