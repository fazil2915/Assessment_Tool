import { Box, useTheme } from "@mui/material";
import { Header } from "@/components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "@/data/mockData";
import {tokens} from "@/theme"

const Question_Bank = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      field: "subject",
      headerName: "Subject",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    
  ];
  return (
    <Box m="20px">
      <Header
        title="QUESTION BANK"
        subtitle="List of Questions for Assessments"
      />
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
            backgroundColor: colors.blueAccent[600],
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

export default Question_Bank;
