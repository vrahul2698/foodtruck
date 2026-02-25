import axios from 'axios';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const RequestAccess = () => {
    const user = useSelector((store) => store?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roleAccess, setRoleAccess] = useState("VENDOR");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");
    if (!user) return;
    const { photoUrl, firstName, lastName, age, gender } = user;
    const requestRestaurantAccess = async () => {
        try {
            if (!roleAccess) {
                setError("Please Select Request Role");
                return;
            }
            const access = await axios.patch("http://localhost:5000/profile/edit",
                { isApproved: "PENDING", requestedRole: roleAccess },
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(access?.data?.data))
            setShowToast(true);

            setInterval(() => {
                setShowToast(false);
                navigate("/")
            }, 3000)
        }
        catch (err) {
            console.log("Error : " + err.message)
            setError(err?.response?.data || "")
        }
    }

    return (
        <>
            {user && <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Request for an Vendor Profile</h2>
                            <div>
                                <figure>
                                    <img
                                        className="w-20 h-20 rounded-full object-cover"
                                        src={photoUrl}
                                        alt="Movie" />

                                </figure>
                            </div>

                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input type="text" className="input" value={firstName} readOnly />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input type="text" className="input" value={lastName} readOnly />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input type="text" className="input" value={age} readOnly />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input type="text" className="input" value={gender} readOnly />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Request Role</legend>
                                    <select className="select" value={roleAccess} onChange={(e) => setRoleAccess(e?.target?.value)}>
                                        <option disabled={true}>Pick Role</option>
                                        <option>VENDOR</option>
                                        <option>DELIVERY</option>
                                    </select>
                                </fieldset>
                            </div>
                            <p className="text-red-600">{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary"
                                    onClick={requestRestaurantAccess}
                                >
                                    Request Access</button>
                            </div>
                        </div>
                        {showToast &&
                            <div className="toast toast-top toast-center">
                                <div className="alert alert-success">
                                    <span>Requested successfully.</span>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>

            }
        </>
    )
}

export default RequestAccess