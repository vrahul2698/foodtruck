import React from 'react'

const RestaurantMaster = () => {
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
              <input type="text" className="input input-bordered w-full" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cuisines</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Indian, Chinese, Fast Food"
              />
            </fieldset>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="email" className="input input-bordered w-full" />
            </fieldset>
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Address Line</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">City</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">State</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pincode</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>
          </div>

          {/* Description */}
          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Tell customers about your restaurant"
            />
          </fieldset>

          {/* Restaurant Status */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-medium">Restaurant Open</span>
            <input type="checkbox" className="toggle toggle-success" />
          </div>

          {/* Submit */}
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Create Restaurant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMaster;