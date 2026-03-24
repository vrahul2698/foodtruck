import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../utils/userSlice'
import axios from 'axios'
import { clearItem } from '../../utils/cartSlice'

const AdminLayout = () => {

  const user = useSelector((store) => store?.user);
  const cartCount = useSelector((store)=> store.cart?.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const logout = await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      // console.log(logout, "logout")
      if (logout?.status === 200) {
        dispatch(removeUser());
        dispatch(clearItem())
        navigate("/login");
      }

    }
    catch (err) {
      console.log("Error :" + err.message)
    }
  }


  return (
    <div className="min-h-screen flex flex-col">

      <div className="navbar bg-base-100 shadow-sm">

        {/* Left side */}
        <div className="flex-1">
          <Link to="dashboard" className="btn btn-ghost text-2xl">
            🍓Food Truck
          </Link>
        </div>

        {/* Right side */}
        {user && (
          <div className="flex-none flex items-center gap-3">
            <p className="text-lg">Hello {user?.firstName}</p>
            {/* Cart Icon with Badge */}
            <Link to="addtocart" className="btn btn-ghost btn-circle relative">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount  && (
                  <span className="badge badge-sm badge-primary indicator-item">
                    {Object.keys(cartCount).length}
                  </span>
                )}
              </div>
            </Link>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={user?.firstName}
                    src={user?.photoUrl}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="requestedroleslist">Request Roles</Link></li>
                <li><Link to="requestaccess">Request Access</Link></li>
                <li><a className="cursor-pointer" onClick={handleLogout}>Logout</a></li>
              </ul>

            </div>

          </div>
        )}

      </div>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default AdminLayout