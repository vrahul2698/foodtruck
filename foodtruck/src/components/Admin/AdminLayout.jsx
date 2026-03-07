import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../utils/userSlice'
import axios from 'axios'

const AdminLayout = () => {
  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const logout = await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      // console.log(logout, "logout")
      if (logout?.status === 200) {
        dispatch(removeUser());
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