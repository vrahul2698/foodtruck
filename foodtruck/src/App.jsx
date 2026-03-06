
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Feed from './components/Feed'
import Login from './components/Login'
import Profile from './components/profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
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


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
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
            </Route>
            <Route path='dashboard' element={<UserDashboard />} />
            {/* DELIVERY Protected Roles */}
            <Route path='/delivery' element={
              <RoleProtectedRoutes allowedRoles={["DELIVERY"]}>
                <DeliveryLayout />
              </RoleProtectedRoutes>
            }>
              <Route path='dashboard' element={<DeliveryDashboard />} />
            </Route>
            {/* ADMIN Protected Roles */}
            <Route path='/admin' element={
              <RoleProtectedRoutes allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </RoleProtectedRoutes>
            }>
              <Route path='requestaccess' element={<RequestAccess />} />
              <Route path='dashboard' element={<AdminDashboard />} />
            </Route>
            {/* </Route> */}

            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
