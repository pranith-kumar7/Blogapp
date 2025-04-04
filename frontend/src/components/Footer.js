import React from 'react'
import { Link } from 'react-router-dom'
import x from '../Assests/footer.png'
function Footer() {
  return (
    <div className='bg-black pt-5 pb-3 fs-5 fw-bold text-white text-center'>
        follow us on 
        <Link className="d-block navbar-brand fw-bolder text-white" to="/">
          <img className='h-25' src={x} alt="" />
        </Link>
        Terms and Conditions Apply
    </div>
  )
}

export default Footer