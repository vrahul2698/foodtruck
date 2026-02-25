import React from 'react'

const MenuCategory = () => {
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
              <select defaultValue="Choose Restaurant" className="select  w-full">
                <option>Choose Restaurant</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category Name</legend>
              <input type="text" className="input input-bordered w-full" />
            </fieldset>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Create Category</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCategory