import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import axios from 'axios/unsafe/axios.js';
import { useEffect } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=> store?.user);

  const fetchUser = async()=>{
    try{
      const user = await axios.get("http://localhost:5000/profile",{withCredentials:true});
      // console.log(user , "Body")
      dispatch(addUser(user?.data));

    }
    catch(err){
       if (err.status === 401) {
        navigate("/login")
      }
      console.log("Error Message : "+err?.message)
    }
  }
  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
  },[])
 return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body