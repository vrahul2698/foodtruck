
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Feed from './components/Feed'
import Login from './components/Login'
import Profile from './components/profile'
import { useDispatch, useSelector } from 'react-redux'
import RequestAccess from './components/RequestAccess'
import RestaurantMaster from './components/RestaurantMaster';
import MenuCategory from './components/MenuCategory'
import MenuItems from './components/MenuItems'
import MenuVariants from './components/MenuVariants'
import RoleProtectedRoutes from './RoleProtectedRoutes'
import VendorLayout from './components/Vendor/VendorLayout';
import UserLayout from './components/User/UserLayout';
import DeliveryLayout from './components/Delivery/DeliveryLayout';
import AdminLayout from './components/Admin/AdminLayout';
import VendorDashboard from './components/Vendor/VendorDashboard'
import UserDashboard from './components/User/UserDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import DeliveryDashboard from './components/Delivery/DeliveryDashboard'
import RequestedRolesList from './components/Admin/RequestedRolesList'
import RestaurantCard from './components/User/RestaurantCard'
import AddToCart from './components/User/AddToCart'
import { useEffect } from 'react'
import { getCartItems } from './services/cartService'
import { getItems, getRestaurantId } from './utils/cartSlice'
import CommonLayout from './components/CommonLayout'
import PrivacyPolicy from './components/FooterPages/PrivacyPolicy';
import TermsOfService from './components/FooterPages/TermsOfService';
import RefundPolicy from './components/FooterPages/RefundPolicy';
import ContactUs from './components/FooterPages/ContactUs';


function App() {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!["ADMIN"].includes(user?.role)) return;
    const fetchCartItems = async () => {
      try {

        const res = await getCartItems();
        dispatch(getRestaurantId(res?.restaurantId ?? ""));
        const normalizeItems = (itemsArray) => {
          return itemsArray.reduce((acc, item) => {
            acc[item.menuItem] = item; // array → object
            return acc;
          }, {});
        };
        dispatch(getItems(normalizeItems(res?.items ?? {})))

      }
      catch (err) {
        console.log("Error :" + err?.message)
      }
    }
    fetchCartItems();
  }, [user])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/refund-policy' element={<RefundPolicy />} />
            <Route path='/contact-us' element={<ContactUs />} />
          </Route>
          {/* VENDOR Protected Roles */}
          <Route path='/vendor' element={
            <RoleProtectedRoutes allowedRoles={["VENDOR"]}
            >
              <VendorLayout />
            </RoleProtectedRoutes>
          }>
            <Route path='dashboard' element={<VendorDashboard />} />
            <Route path='restaurantmaster' element={<RestaurantMaster />} />
            <Route path='menucategory' element={<MenuCategory />} />
            <Route path='menuitems' element={<MenuItems />} />
            <Route path='menuvariants' element={<MenuVariants />} />
            <Route path='profile' element={
              <Profile />
            } />
          </Route>
          {/* USER Protected Roles */}
          <Route path='/user' element={
            <RoleProtectedRoutes allowedRoles={["USER"]}>
              <UserLayout />
            </RoleProtectedRoutes>
          }>
            <Route path='profile' element={
              <Profile />
            } />
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='requestaccess' element={<RequestAccess />} />

          </Route>
          {/* DELIVERY Protected Roles */}
          <Route path='/delivery' element={
            <RoleProtectedRoutes allowedRoles={["DELIVERY"]}>
              <DeliveryLayout />
            </RoleProtectedRoutes>
          }>
            <Route path='dashboard' element={<DeliveryDashboard />} />
            <Route path='profile' element={
              <Profile />
            } />
          </Route>
          {/* ADMIN Protected Roles */}
          <Route path='/admin' element={
            <RoleProtectedRoutes allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </RoleProtectedRoutes>
          }>
            <Route path='requestedroleslist' element={<RequestedRolesList />} />
            <Route path='requestaccess' element={<RequestAccess />} />
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='restaurant/:id' element={<RestaurantCard />} />
            <Route path='addtocart' element={<AddToCart />} />
            <Route path='profile' element={
              <Profile />
            } />
          </Route>
          {/* </Route> */}

          {/* </Route> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
