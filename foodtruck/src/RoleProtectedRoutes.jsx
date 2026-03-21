import axios from "axios/unsafe/axios.js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";

const RoleProtectedRoutes = ({ allowedRoles, children }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  // console.log(allowedRoles, "allowedRoles")

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const user = await axios.get("http://localhost:5000/profile", { withCredentials: true });
        console.log(user, "user")

        dispatch(addUser(user?.data))
        setLoading(false)
      }
      catch (err) {
        setLoading(false)
        if (err?.response?.status === 401) {
          navigate("/login")
        }
        console.log(err, "message")
      }
    }



    fetchUser();
  }, [])

  // If not logged in
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed
  if (!allowedRoles.includes(user.userStatus)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything fine
  return children;
};

export default RoleProtectedRoutes;