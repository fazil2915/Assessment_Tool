import { Box, Button, useTheme, TextField, 
  useMediaQuery,
  Card, 
  CardMedia,
  CardContent,
  Typography,
  CardActionArea, } from "@mui/material";
import { Header } from "@/components";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "@/theme";
import { useDispatch, useSelector } from "react-redux";
import {setCourse} from "@/state"
import { useNavigate } from "react-router-dom";
const initialValues = {
  
title:"",
description:"",
resources:"",
};



const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  resources: yup.string().required("required"),
});


const CourseForm = () => {
  const theme = useTheme();
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);
  console.log(token);
  
  const user=useSelector((state)=>state.user)
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const getCourse=async (values)=>{
    
  // }
 
  const createCourse = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    try {
      const body=JSON.stringify(values)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/course/${user._id}`, {
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        
      });
      const loggedIn = await response.json();
     
      if (loggedIn) {
        onSubmitProps.resetForm();
        dispatch(
          setCourse({
            course: loggedIn
          })
        );
        navigate("/dash");
      } else {
        console.error("Error creating course:", loggedIn.message || loggedIn.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  const handleFormSubmit = async  (values, onSubmitProps) => {
    await createCourse(values, onSubmitProps);
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header title="Create Course" subtitle="Create a Course to Add Assessment" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, 1fr)"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
             
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              /> */}
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                title="title"
                error={touched.title && errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Resource link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resources}
                name="resources"
                error={touched.resources && errors.resources}
                helperText={touched.resources && errors.resources}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={touched.address2 && errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" sx={{ backgroundColor: colors.blueAccent[600]}} variant="contained">
                Create New Course
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box>
  <Header title="Courses" subtitle="Your available courses" />
  <Box 
    sx={{ 
      display: 'grid', 
      gap: 2, // Adjust gap for spacing between cards
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' // Responsive grid layout
    }}
  >
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Course 1
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Course 1 description goes here. Provide some meaningful content.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Course 2
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Course 2 description goes here. Provide some meaningful content.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Course 3
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Course 3 description goes here. Provide some meaningful content.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    {/* Add more cards as needed */}
  </Box>
</Box>

    </Box>
  );
};

export default CourseForm;
