import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../../utils/userSlice';
import Footer from '../Footer';

const VendorLayout = () => {
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
    <>
      <div className="min-h-screen flex flex-col">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <Link to={"dashboard"} className="btn btn-ghost text-2xl">🍓Food Truck</Link>
          </div>
          {user &&
            <div className="flex gap-2">
              <p className='mt-2 text-xl'>Hello {user?.firstName},</p>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={user?.firstName}
                      src={user?.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li> <Link to={"profile"}> Profile</Link></li>
                  {/* <li><Link to={"requestaccess"}>Request Access</Link></li> */}
                  <li><Link to={"restaurantmaster"}>Restaurant</Link></li>
                  <li>
                    <details>
                      <summary>Items</summary>
                      <ul className="bg-base-100 rounded-t-none p-2">
                        <li><Link to={"menucategory"}>Menu Category</Link></li>
                        <li><Link to={"menuitems"}>Menu Items</Link></li>
                        <li><Link to={"menuvariants"}>Menu Variants</Link></li>
                      </ul>
                    </details>
                  </li>
                  <li><a className='cursor-pointer' onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          }
        </div>
        {/* Page Content */}
        <main className="flex-1 p-6 pb-16">
          <Outlet />
        </main>

        {/* Footer always visible */}
        <Footer />

      </div>
    </>
  )
}

export default VendorLayout