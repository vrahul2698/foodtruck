import axios from 'axios/unsafe/axios.js';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  console.log(user, "user");
  const fetchUser = async () => {
    try {
      const user = await axios.get("http://localhost:5000/profile", { withCredentials: true });
      console.log(user , "user")

      dispatch(addUser(user?.data))
    }
    catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login")
      }
      console.log(err, "message")
    }
  }
  useEffect(() => {
    if (!user) {
      fetchUser();
    }

  }, [])



  return (
    <div>Feed</div>
  )
}

export default Feed