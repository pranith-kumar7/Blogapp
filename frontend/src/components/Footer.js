import React from 'react'
import { Link } from 'react-router-dom'
import x from '../Assests/footer.png'

function Footer() {
  return (
    <footer className='page-shell pb-4'>
      <div className='glass-panel px-4 py-4 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3 text-center text-lg-start'>
        <div>
          <div className='brand-pill mb-2'>Built For Writers</div>
          <h3 className='mb-2'>Publish polished stories with a cleaner workflow.</h3>
          <p className='section-copy mb-0'>A role-based blog experience for readers, authors, and future admin workflows.</p>
        </div>
        <Link className="d-inline-block navbar-brand fw-bolder text-white" to="/">
          <img style={{maxWidth:'180px'}} src={x} alt="Blog App footer art" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
