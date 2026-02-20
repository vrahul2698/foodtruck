import React, { useState } from 'react'
import axios from './../../node_modules/axios/lib/axios';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const query = {
        firstName, lastName, age, emailId, password, phoneNumber, gender
      };
      const user = await axios.post("http://localhost:5000/signup", query, { withCredentials: true });
      if (user?.status === 200) {
        dispatch(addUser(user?.data?.data));
        navigate("/")
        console.log(user?.data, "query")
      }

      console.log(user, "query")

    }
    catch (err) {
      console.log(err?.response?.data || "Something Went Wrong")
      const error = err?.response?.data?.message || "Something Went Wrong";
      setError(error);
    }
  }
  const handleLogin = async () => {
    try {
      const query = { password, phoneNumber };
      const user = await axios.post("http://localhost:5000/login", query, { withCredentials: true });
      dispatch(addUser(user?.data));
      navigate("/")
      console.log(user?.data, "query")

    }
    catch (err) {
      console.log(err?.response?.data || "Something Went Wrong");
      const error = err?.response?.data?.message || "Something Went Wrong";
      setError(error);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className='card card-border bg-base-300 w-96'>
        <div className='card-body'>
          <h2 className="card-title justify-center">{"Login"}</h2>
          <div>
            {!isLoginForm &&
              <>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Gender</legend>
                  <select defaultValue="Gender" className="select" key={gender} value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option disabled={true}>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Email</legend>
                  <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </fieldset>
              </>}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Phone Number</legend>
              <input type="text" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          {error && <p className='font-bold text-red-700'>{error}</p>}
          <div className='card-actions justify-center'>
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSubmit}>Login</button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={() => {
            setIsLoginForm((prev) => !prev)
            setError("")
          }}>{isLoginForm ? "New User.? Sign Up" : "Already User ? Sign In"}</p>
        </div>
      </div>
    </div>

  )
}

export default Login