
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


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            {/* <Route path='/' element={<Body />}> */}
            {/* <Route path='/' element={<Feed />} /> */}
            {/* <Route path='/profile' element={<Profile />} /> */}

            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to={<Login />} />} />

            {/* <Route element={<MainLayout/>}> */}
       
            {/* VENDOR Protected Roles */}
            <Route path='/vendor' element={
              <RoleProtectedRoutes allowedRoles={["VENDOR"]}
              >
                <VendorLayout />
              </RoleProtectedRoutes>
            }>
              <Route path='restaurantmaster' element={<RestaurantMaster />} />
              <Route path='menucategory' element={<MenuCategory />} />
              <Route path='menuitems' element={<MenuItems />} />
              <Route path='menuvariants' element={<MenuVariants />} />
                   <Route path='profile' element={
              <Profile />
            } />
            </Route>
            <Route path='/user' element={
              <RoleProtectedRoutes allowedRoles={["USER"]}>
                <UserLayout />
              </RoleProtectedRoutes>
            }>
                  <Route path='profile' element={
              <Profile />
            } />
            </Route>
            <Route path='/delivery' element={
              <RoleProtectedRoutes allowedRoles={["DELIVERY"]}>
                <DeliveryLayout />
              </RoleProtectedRoutes>
            }>
            </Route>
            <Route path='/admin' element={
              <RoleProtectedRoutes allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </RoleProtectedRoutes>
            }>
              <Route path='requestaccess' element={<RequestAccess />} />
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
