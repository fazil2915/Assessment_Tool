import { Box, useTheme, Button } from "@mui/material";
import { Header } from "@/components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "@/theme"
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import {format} from "date-fns"


const Contacts = () => {
  const theme = useTheme();
  const navigate=useNavigate()
  const colors = tokens(theme.palette.mode);
  const token=useSelector((state)=>state.token)
  const user=useSelector((state)=>state.user)
  const [assessment,setAsessment]=useState([])
  const handleClick=()=>{
    navigate('/create_assessment')
  }

  useEffect(()=>{
    getAssessments()
  },[])
  
  const getAssessments = async (req, res) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/assessment/${user._id}/getassessment`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      const mappedData = data.map(assess => {
        const slicedId = assess._id.slice(2, 6); 
        const created_At=format(new Date(assess.createdAt), 'MM/dd/yyyy ')
        const Due=format(new Date(assess.due),'MM/dd/yyyy ')
        const Scheduled_At=assess.scheduled_at?format(new Date(assess.scheduled_at),'MM/dd/yyyy '):null

        return {
          sliceId: slicedId, 
          ...assess, 
          id: slicedId, 
          createdAt:created_At,
          due:Due,
          scheduled_at:Scheduled_At?Scheduled_At:'None'
        };
      });
  
      setAsessment(mappedData);
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title" },
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
      field: "scheduled_at",
      headerName: "Sheduled At",
      flex: 1,
    },
    {
      field: "due",
      headerName: "Due",
      flex: 1,
    },
    {
      field: "createdAt",
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
        rows={assessment}
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
