import React from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'
function RootLayout() {
  return (
    <div className='app-shell'>
        <Navigation />
            <main style={{minHeight:'calc(100vh - 180px)'}}>
                <Outlet />
            </main>
        <Footer/>
    </div>
  )
}

export default RootLayout
