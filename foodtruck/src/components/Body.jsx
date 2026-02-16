import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <Navbar/>
        {/* Used to Render child routes */}
        {/* where nested routes render their components. */}
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body