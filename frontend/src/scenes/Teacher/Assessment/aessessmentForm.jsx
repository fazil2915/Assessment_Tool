import {
    Box, Button, useTheme, TextField,
    useMediaQuery,
    MenuItem
} from "@mui/material";
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { Header } from "@/components";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "@/theme";
import { setAsessment } from "@/state";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const initialValues = {
    title: "",
    instruction: "",
    type: "",
    grading_options: {
        type: "",
       
    },
    status: "",
    attempt: "",
    feedback: "",
    visibility: "",
    scheduled_at: "",
    due: ""
};


const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    instruction: yup.string().required("required"),
    grading_options: yup.object().shape({
        type: yup.string().required("required"),
    }),
    status: yup.string().required("required"),
    attempt: yup.string().required("required"),
    feedback: yup.string().required("required"),
    visibility: yup.string().required("required"),
    scheduled_at: yup.date().required("required"),
    due: yup.date().required("required"),
});
const createAssessment = () => {
    const [visibilityOptions, setVisibilityOptions] = useState([]);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        getAsessment()
    }, [])

    //get assessment fom api

    const getAsessment = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/teacher/getallstudents`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Extract visibility names from each exam object
            const options = data.map(item => ({
                id: item._id,
                name: item.name
            }));

            setVisibilityOptions(options);

        } catch (error) {
            console.error("Error fetching visibility options:", error);
        }
    };




    //create assessment api
    const createAssessment = async (values, onSubmitProps) => {
        // Format dates if present
        const formattedValues = {
            ...values,
            scheduled_at: values.scheduled_at ? new Date(values.scheduled_at).toISOString() : null,
            due: values.due ? new Date(values.due).toISOString() : null
        };

        try {
            const response = await fetch(`http://localhost:8000/api/teacher/assessment/${user._id}`, {
                method: "POST",
                body: JSON.stringify(formattedValues),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });


            const loggedIn = await response.json();

            if (loggedIn) {
                onSubmitProps.resetForm();
                dispatch(
                    setAsessment({
                        assessment: loggedIn
                    })
                );
            } else {
                console.error("Error creating assessment:", loggedIn.message || loggedIn.error);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values);
        await createAssessment(values, onSubmitProps);
    };
    const handleQuestion = () => {
        navigate('/addQuestion')
    }

    return (
        <Box m="20px">
            <Header title="CREATE ASSESSMENT" subtitle="Create a Assessment to students" />
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
                    setFieldValue,  // Destructure setFieldValue to manually set values
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(12, 1fr)"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Instructions"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.instruction}
                                name="instruction"
                                error={touched.instruction && Boolean(errors.instruction)}
                                helperText={touched.instruction && errors.instruction}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                label="Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.type}
                                name="type"
                                error={touched.type && Boolean(errors.type)}
                                helperText={touched.type && errors.type}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem value="Quiz">Quiz</MenuItem>
                                <MenuItem value="Assignment">Assignment</MenuItem>
                                <MenuItem value="Exercise">Exercise</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="Grading Options"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.grading_options.type}  // Ensure this is 'grading_options.type'
                                name="grading_options.type" // This will map to 'type' in grading_options
                                error={touched.grading_options?.type && Boolean(errors.grading_options?.type)}
                                helperText={touched.grading_options?.type && errors.grading_options?.type}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem value="Automated">Automated</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="Status"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.status}
                                name="status"
                                error={touched.status && Boolean(errors.status)}
                                helperText={touched.status && errors.status}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem value="Published">Publish</MenuItem>
                                <MenuItem value="Draft">Draft</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Number of Attempts"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.attempt}
                                name="attempt"
                                error={touched.attempt && Boolean(errors.attempt)}
                                helperText={touched.attempt && errors.attempt}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="Feedback Option"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.feedback}
                                name="feedback"
                                error={touched.feedback && Boolean(errors.feedback)}
                                helperText={touched.feedback && errors.feedback}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem value="None">None</MenuItem>
                                <MenuItem value="Immediate">Immediate</MenuItem>
                                <MenuItem value="Delayed">Delayed</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="Visibility"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.visibility}
                                name="visibility"
                                error={touched.visibility && Boolean(errors.visibility)}
                                helperText={touched.visibility && errors.visibility}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {visibilityOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="Attachment"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.visibility}
                                name="visibility"
                                error={touched.visibility && Boolean(errors.visibility)}
                                helperText={touched.visibility && errors.visibility}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {visibilityOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField> */}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, gridColumn: "span 4" }}>
                                    <DatePicker
                                        label="Scheduled At"
                                        value={values.scheduled_at ? dayjs(values.scheduled_at) : null}
                                        onChange={(newValue) => setFieldValue("scheduled_at", newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth variant="filled" />
                                        )}
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1.2rem',
                                            },
                                            '& .MuiInputBase-root': {
                                                width: '100%',
                                            },
                                            '& .MuiPaper-root': {
                                                overflow: 'hidden',
                                                maxHeight: 'none',
                                            },
                                        }}
                                    />
                                </Box>
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, gridColumn: "span 4" }}>
                                    <DatePicker
                                        label="Due"
                                        value={values.due ? dayjs(values.due) : null}
                                        onChange={(newValue) => setFieldValue("due", newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth variant="filled" />
                                        )}
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                fontSize: '1.2rem',
                                            },
                                            '& .MuiInputBase-root': {
                                                width: '100%',
                                            },
                                            '& .MuiPaper-root': {
                                                overflow: 'hidden',
                                                maxHeight: 'none',
                                            },
                                        }}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="end"
                            mt="20px"
                        >
                            <Button type="submit" color="primary" sx={{
                                backgroundColor: colors.greenAccent[600],
                                mr: "10px", fontSize: "14px"
                            }} variant="contained" onClick={handleQuestion}>
                                Add Question
                            </Button>

                            <Button type="submit" sx={{ backgroundColor: colors.blueAccent[600], fontSize: "14px" }} variant="contained">
                                Create New Assessment
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default createAssessment;
