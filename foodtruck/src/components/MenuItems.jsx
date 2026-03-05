import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import Select from "react-select";

const MenuItems = () => {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [menuCategoryOptions, setMenyCategoryOtions] = useState([]);

  const [restaurantValue, setRestaurantValue] = useState("");
  const [menuItemName, setMenuItemName] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      const res = await axios.get(BASE_URL + "filteredrestaurants", {
        withCredentials: true,
      });
      // console
      const restaurants = res.data?.restaurants?.length
        ? res.data?.restaurants
        : [];
      setRestaurantNames(
        restaurants?.map((rest) => ({
          label: rest?.name,
          value: rest?._id,
        })),
      );
    };

    fetchRestaurantNames();
  }, []);
  useEffect(() => {
    if (restaurantValue) {
      const fetchMenuCategoryNames = async () => {
        const res = await axios.get(
          BASE_URL + "menucategory?restaurantValue=" + restaurantValue?.value,
          { withCredentials: true },
        );
        const menuCategories =
          res.data?.menucategories?.length > 0
            ? res.data?.menucategories?.map((data) => ({
              label: data?.name,
              value: data?._id,
            }))
            : [];
        console.log(res.data, "res.data");
        // const restaurants = res.data?.restaurants?.length ? res.data?.restaurants : []
        setMenyCategoryOtions(menuCategories);
      };

      fetchMenuCategoryNames();
    }
  }, [restaurantValue]);
  const createMenuItem = async () => {
    try {
      const query = {
        restaurantId: restaurantValue?.value,
        categoryId: categoryValue?.value,
        name: menuItemName,
        foodType: itemType,
        description,
        basePrice,
        discountPercent
      };
      console.log(query, "query");
    } catch (err) {
      console.log("Error :" + err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-base-200 min-h-screen">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">
            Create Menu Items
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Restaurant Name</legend>
              <Select
                options={restaurantNames}
                value={restaurantValue}
                onChange={(option) => {
                  setRestaurantValue(option);
                }}
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
              <legend className="fieldset-legend ">Category Name</legend>
              <Select
                options={menuCategoryOptions}
                value={categoryValue}
                onChange={(option) => {
                  setCategoryValue(option);
                }}
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
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Item Name</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                value={menuItemName}
                onChange={(e) => setMenuItemName(e?.target?.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Item Type</legend>
              <Select
                options={[
                  { label: "VEG", value: "VEG" },
                  { label: "NON_VEG", value: "NON_VEG" },
                  { label: "EGG", value: "EGG" },
                ]}
                value={itemType}
                onChange={(option) => {
                  setItemType(option);
                }}
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
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Tell customers about your Menu"
                value={description}
                onChange={(e) => setDescription(e?.target?.value)}
              />
            </fieldset>
          </div>
               <div className="grid md:grid-cols-2 gap-4 mt-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Base Price</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                value={basePrice}
                onChange={(e) => setBasePrice(e?.target?.value)}
              />
            </fieldset>
             <fieldset className="fieldset">
              <legend className="fieldset-legend">Discount Percent</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e?.target?.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary" onClick={createMenuItem}>
              Create Category
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Restaurant added successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
