import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import Select from 'react-select';

const MenuCategory = () => {
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [restaurantValue, setRestaurantValue] = useState("");
  const [menuCategoryName, setMenuCategoryName] = useState("")
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  console.log(restaurantValue, "restaurantValue")
  useEffect(() => {
    const fetchRestaurantNames = async () => {
      const res = await axios.get(BASE_URL + "filteredrestaurants", { withCredentials: true });
      // console
      const restaurants = res.data?.restaurants?.length ? res.data?.restaurants : []
      setRestaurantNames(restaurants?.map(rest => ({
        label: rest?.name,
        value: rest?._id
      })));
    };

    fetchRestaurantNames();
  }, []);

  const CreateCategory = async () => {
    try {
      const query = {
        restaurantId: restaurantValue?.value,
        category: menuCategoryName
      }
      const menuCat = await axios.post(BASE_URL + "itemscategory", query, { withCredentials: true });
      setError("");
      setShowToast(true);
      setTimeout(() => { setShowToast(false) }, 2000)


    }
    catch (err) {
      console.log("Error : " + err?.response?.data);
      setError(err?.response?.data || "Something Went Wrong")
    }
  }
  return (
    <div className="flex justify-center py-10 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">
            Create Menu Category
          </h2>

          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Restaurant Name</legend>
              <Select
                options={restaurantNames}
                value={restaurantValue}
                onChange={(option) => { setRestaurantValue(option) }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#2a323c",
                    primary: "#570df8", // DaisyUI primary
                    neutral0: "#1d232a",
                    neutral80: "#ffffff",
                  },
                })}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category Name</legend>
              <input type="text" className="input input-bordered w-full" value={menuCategoryName} onChange={(e) => setMenuCategoryName(e?.target?.value)} />
            </fieldset>
          </div>
          {error &&
            <p className='text-red-600'>{error}</p>}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary" onClick={CreateCategory}>Create Category</button>
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
  )
}

export default MenuCategory