import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants';
import axios from 'axios/unsafe/axios.js';

const RestaurantMaster = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pincode, setPincode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");


  const fetchAddress = async (pin) => {
    if (pin.length === 6) {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      console.log(data, "data")
      //       const getCurrentLocation = () =>
      //         new Promise((resolve, reject) =>
      //           navigator.geolocation.getCurrentPosition(resolve, reject)
      //         );
      //       const geolocation = await getCurrentLocation();
      //       if (geolocation) {
      //         const latitude = geolocation?.coords?.latitude;
      //         const longitude = geolocation?.coords?.longitude;
      //      const res = await fetch(
      //   `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      // );

      //   const data = await res.json();
      //         console.log(data, geolocation, "Fetch Address")

      //       }


      if (data[0].Status === "Success") {
        setCity(data[0].PostOffice[0].District);
        setState(data[0].PostOffice[0].State);
      }
    }
  };
  useEffect(() => {
    if (pincode.length !== 6) return;
    if (!/^[0-9]{6}$/.test(pincode)) return;
    const timer = setTimeout(() => {
      fetchAddress(pincode);
    }, 600); // 600ms delay

    return () => clearTimeout(timer);
  }, [pincode]);

  const sendRequest = async () => {
    try {
      const query = {
        name: restaurantName,
        description: description,
        cuisines,
        // resOwnerId
        // restaurantImage,
        contact: {
          email: email,
          phone: phoneNumber
        },
        address: {
          line1: addressLine1,
          city,
          state,
          pincode
        },
        isOpened:isRestaurantOpen
      }
      const res = await axios.post(BASE_URL + "restaurant", {
        query
      }, { withCredentials: true });
        console.log(res?.data , "Restaurant Create")
          setError("");
         setShowToast(true);
         setTimeout(()=> {setShowToast(false)},2000)

    }

    catch (err) {
      console.log("Error : " + err?.response?.data);
      setError(err?.response?.data || "Something Went Wrong")
    }
  };

  return (
    <div className="flex justify-center py-10 bg-base-200 min-h-screen">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Create Restaurant
          </h2>

          {/* Image Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Restaurant Logo</legend>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                // onChange={handleLogoChange}
                />
              </fieldset>

              {/* {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-3 w-24 h-24 rounded-full object-cover border"
                />
              )} */}
            </div>
            {/* Banner Upload */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Banner Image</legend>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                // onChange={handleBannerChange}
                />
              </fieldset>

              {/* {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="mt-3 w-full h-32 object-cover rounded-lg border"
                />
              )} */}
            </div>
          </div>
          {/* Restaurant Info */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Restaurant Name</legend>
              <input type="text" className="input input-bordered w-full" value={restaurantName} onChange={(e) => setRestaurantName(e?.target?.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cuisines</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Indian, Chinese, Fast Food"
                value={cuisines} onChange={(e) => setCuisines(e?.target?.value)}
              />
            </fieldset>
          </div>
          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input type="text" className="input input-bordered w-full" value={phoneNumber} onChange={(e) => setPhoneNumber(e?.target?.value)} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e?.target?.value)} />
            </fieldset>
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Address Line</legend>
              <input type="text" className="input input-bordered w-full" value={addressLine1} onChange={(e) => setAddressLine1(e?.target?.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pincode</legend>
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
                className="input input-bordered w-full"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">City</legend>
              <input type="text" className="input input-bordered w-full" value={city} readOnly />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">State</legend>
              <input type="text" className="input input-bordered w-full" value={state} readOnly />
            </fieldset>
          </div>

          {/* Description */}
          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Tell customers about your restaurant"
              value={description}
              onChange={(e) => setDescription(e?.target?.value)}
            />
          </fieldset>

          {/* Restaurant Status */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-medium">Restaurant Open</span>
            <input type="checkbox" className="toggle toggle-success" value={isRestaurantOpen} onChange={() => setIsRestaurantOpen((val) => !val)} />
          </div>
          {error &&
          <p className='text-red-600'>{error}</p>}

          {/* Submit */}
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary" onClick={sendRequest}>Create Restaurant</button>
          </div>
        </div>
      </div>
            {showToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Restaurant added successfully.</span>
                    </div>
                </div>}
    </div>
  );
};

export default RestaurantMaster;