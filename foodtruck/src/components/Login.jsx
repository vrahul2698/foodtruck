import React, { useState } from 'react'

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)
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
                  <input type="text" className="input" />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" className="input" />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Gender</legend>
                  <select defaultValue="Gender" className="select">
                    <option disabled={true}>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input type="text" className="input" />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Email</legend>
                  <input type="text" className="input" />
                </fieldset>
              </>}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Phone Number</legend>
              <input type="text" className="input" />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" />
            </fieldset>
          </div>
          <div className='card-actions justify-center'>
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="m-auto cursor-pointer py-2">New User.? SignUp</p>
        </div>
      </div>
    </div>

  )
}

export default Login