import React from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'
function RootLayout() {
  return (
    <div>
        <Navigation />
            <div style={{minHeight:'100vh'}}>
                <Outlet />
            </div>
        <Footer/>
    </div>
  )
}

export default RootLayout