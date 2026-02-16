import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar bg-base-300 shadow-sm'>
      <div className='flex-1'>
        <Link to={"/"} className="btn btn-ghost text-2xl">🍓Food Truck</Link>
      </div>
    </div>
  )
}

export default Navbar