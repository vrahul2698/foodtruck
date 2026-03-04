import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../Footer'

const DeliveryLayout = () => {
  return (
   <>
      <div className="min-h-screen flex flex-col">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <Link to={"/"} className="btn btn-ghost text-2xl">🍓Food Truck</Link>
          </div>
        </div>
        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer always visible */}
        <Footer />

      </div>
      </>
  )
}

export default DeliveryLayout