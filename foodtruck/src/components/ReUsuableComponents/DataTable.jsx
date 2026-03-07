import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function DataTable({
  loading = false,
  rows = [],
  columns = [],
  pageSizeOptions = [5, 10],
  checkboxSelection = false,
  height = 400
}) {

  const paginationModel = { page: 0, pageSize: pageSizeOptions[0] };

  return (
    <Paper sx={{ height: height, width: "100%" }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}