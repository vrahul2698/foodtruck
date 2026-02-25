
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from './components/Body'
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


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Feed />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/requestaccess' element={<RequestAccess/>}/>
              <Route path='/restaurantmaster' element={<RestaurantMaster/>}/>
              <Route path='/menucategory' element={<MenuCategory/>}/>
              <Route path='/menuitems' element={<MenuItems/>}/>
              <Route path='/menuvariants' element={<MenuVariants/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
