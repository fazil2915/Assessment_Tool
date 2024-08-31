import { Box, useTheme, Button } from "@mui/material";
import { Header } from "@/components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "@/data/mockData";
import { tokens } from "@/theme"
import {  useNavigate } from "react-router-dom";

const Contacts = () => {
  const theme = useTheme();
  const navigate=useNavigate()
  const colors = tokens(theme.palette.mode);

  const handleClick=()=>{
    navigate('/create_assessment')
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "Title", headerName: "Title" },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      cellClassName: "type-column--cell",
    },
    {
      field: "attempt",
      headerName: "Attempts",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "feedback",
      headerName: "Feedback",
      flex: 1,
    },
    {
      field: "sheduled_at",
      headerName: "Sheduled At",
      flex: 1,
    },
    {
      field: "due",
      headerName: "Due",
      flex: 1,
    },
    {
      field: "time limit",
      headerName: "time_limit",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
  ];

  //const createAssessment=
  return (
    <Box m="20px">
      <Header
        title="ASSESSMENTS"
        subtitle="List of Assessments have done"
      />
      <Button type="submit" sx={{ backgroundColor: colors.blueAccent[600] }} variant="contained" onClick={handleClick}>
        Create Assessment
      </Button>
      <Box
        mt="40px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Contacts;
