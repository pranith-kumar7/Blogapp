import React from 'react'
import { Link } from 'react-router-dom'
import i from '../Assests/Icon.png'
import { useSelector,useDispatch } from 'react-redux'
import { resetState } from '../redux/slices/userloginslice'
function Navigation() {

      const {currentUser,loginStatus}=useSelector(state=>state.userlogin)
      let dispatch=useDispatch()

      function logOut(obj){
        //remove tooken from browser storage
        sessionStorage.removeItem('token')
        //reset state
        let action=resetState()
        dispatch(action) 
      }

  return (
    <div className='bg-black d-flex align-items-center justify-content-between px-3 py-2'>
        <Link className="navbar-brand fw-bolder text-white" to="/">
          <img className='rounded-circle' style={{width:"62px",height:"62px"}} src={i} alt="" />
         {/*  <input type="text" className='form-control mx-auto w-50' placeholder='search'  value={search}
            onChange={(e) => getSearch(e.target.value)} /> */}
        </Link>
        <ul className="navbar-nav d-flex flex-row gap-4">
            {loginStatus===false?(<>{" "}<li className="nav-item"> 
            <Link className="nav-link fs-5 text-info fw-bold" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-5 text-info fw-bold" to="/signup">
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-5 text-info fw-bold" to="/signin">
              SignIn
            </Link>
          </li></>):(<li className="nav-item">
            <Link className="nav-link fs-5 text-danger fw-bold" onClick={logOut}>
             <span className="fw-bolder text-info fs-4 me-3 fw-3" onClick={(e)=>{e.preventDefault();e.stopPropagation();}}>{currentUser.username}
             <sup className='text-info'>({currentUser.userType})</sup>
             </span>
              Signout
            </Link>
          </li>)}  
        </ul>
    </div>
  )
}

export default Navigation