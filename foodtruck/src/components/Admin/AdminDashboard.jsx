import DataTable from "../ReUsuableComponents/DataTable"

const AdminDashboard = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Item Name", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          {/* <button onClick={() => handleEdit(params.row)}>Edit</button> */}
          <button className="cursor-pointer">Edit</button>&nbsp;
          <button className="cursor-pointer">Delete</button>
        </>
      )
    }
  ];

  const rows = [
    { id: 1, name: "Burger", price: 120 },
    { id: 2, name: "Pizza", price: 250 }
  ];

  return (
    <div>
      Admin
      <div className="grid md:grid-cols-2 gap-6">
        <DataTable
          rows={rows}
          columns={columns}
          checkboxSelection={true}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>

    </div>
  )
}

export default AdminDashboard