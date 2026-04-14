import React from 'react'
import v from '../Assests/home.mp4'
import { useNavigate} from 'react-router-dom'

function Home() {
  let navigate=useNavigate()

  return (
    <section className='page-shell page-hero'>
      <div className='glass-panel overflow-hidden'>
        <div className='row g-0 align-items-stretch'>
          <div className='col-lg-6 p-4 p-lg-5 d-flex flex-column justify-content-center'>
            <div className='brand-pill mb-3'>Professional Publishing Space</div>
            <h1 className='section-title'>Write clearly. Publish confidently. Build an audience with a cleaner editorial flow.</h1>
            <p className='section-copy'>
              Blog App gives readers and authors distinct experiences: discovery for users, publishing controls for authors, and a structure that is already wired for real deployment.
            </p>
            <div className='badge-row'>
              <span className='brand-pill'>Role-based access</span>
              <span className='brand-pill'>JWT auth</span>
              <span className='brand-pill'>MongoDB-backed content</span>
            </div>
            <div className='d-flex flex-wrap gap-3 mt-4'>
              <button className='primary-btn' onClick={() => navigate('/signup')}>Get started</button>
              <button className='ghost-btn' onClick={() => navigate('/signin')}>Sign in</button>
            </div>
          </div>
          <div className='col-lg-6 position-relative'>
            <video autoPlay loop muted className='w-100 h-100 object-fit-cover' style={{minHeight:'460px'}} src={v} />
            <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(2, 6, 23, 0.08), rgba(2, 6, 23, 0.62))'}} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
