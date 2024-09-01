import { Box, Button, useTheme } from "@mui/material";
import { Header } from "@/components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "@/theme"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAsessment } from "@/state";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";



const notify = () => {
  toast.success('Question Added', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}
const Question_Bank = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const assessment = useSelector((state) => state.assessment)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const token = useSelector((state) => state.token)
  const [questions, setQuestions] = useState([])
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "text", headerName: "Question" },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
  // Conditionally add the Actions column if `assessment` is true
  ...(assessment ? [{
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{ backgroundColor: colors.greenAccent[600] }}
        onClick={() => addToAssessment(params.row.id)}
      >
        Add
      </Button>
    )
  }] : [])
];
                    
  useEffect(() => {
    getQuestions()
  }, [token])

//Add question to assess
const addToAssessment = async (questionId) => {
  try {
    const user = await fetch(`http://localhost:8000/api/teacher/assessment/${assessment._id}/toBank/${questionId}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const assess = await user.json()
    dispatch(
      setAsessment({
        assessment: assess
      })
   
    ); 
      notify()
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
}

const handleclick=()=>{
navigate('/addquestion')
}

// Fetch all questions
const getQuestions = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/teacher/assessment/getAllQuestion", {
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
    const mappedData = data.map(question => ({
      id: question._id,
      ...question,
    }));
    setQuestions(mappedData);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
};

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
        rows={questions}
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
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Bounce}
  />
         
  </Box>
);
};

export default Question_Bank;
