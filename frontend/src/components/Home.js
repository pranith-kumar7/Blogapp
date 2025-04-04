import React from 'react'
import v from '../Assests/home.mp4'
import { useNavigate} from 'react-router-dom'
function Home() {
    let navigate=useNavigate()
    //let {search=""}=useOutletContext()
   function getSignup(obj)
   {
      navigate('/signup')
   }
  return (
    <div>
        <video autoPlay loop muted className='w-100 vh-100 object-fit-cover' src={v}>
        </video>
        <p className='pt-5 ps-5 pe-5 text-center lead position-absolute top-50 text-white fs-bolder'>Welcome to Our Blog App! 🚀 Explore, share, and connect with a community of passionate writers and readers. Start your journey today and dive into a world of stories, insights, and ideas!</p>
        <button className='position-absolute top-50 translate-middle start-50 bg-black text-info rounded-pill' onClick={getSignup}>GET STARTED</button>
    </div>
  )
}

export default Home