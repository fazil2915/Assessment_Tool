import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, IconButton, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Header } from "@/components";
import { useSelector } from 'react-redux';
import { tokens } from '@/theme';
import Question_Bank from '..';
import { useDispatch } from 'react-redux';
import { setAsessment } from '@/state';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const initialValues = {
  text: '',
  description: '',
  resources: '',
  type: '',
  difficulty: '',
  subject: '',
  category: '',
  score: '',
  isReusable: "",
  options: [{ option: '', is_Correct: false }],
  answer: ''
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required('Title is required'),
  resources: Yup.string().url('Invalid URL'),
  type: Yup.string().required('Type is required'),
  difficulty: Yup.string().required('Difficulty is required'),
  isReusable: Yup.string().required('Reusable status is required'),
  subject: Yup.string().required('Subject is required'),
  category: Yup.string().required('Category is required'),
  score: Yup.number().min(0, 'Score must be positive').required('Score is required'),

  //Conditional validation for options based on type
  // options: Yup.array().when('type', {
  //   is: 'Multiple', // If type is 'Multiple'
  //   then: Yup.array()
  //     .of(
  //       Yup.object().shape({
  //         option: Yup.string().required('Option is required'),
  //         is_Correct: Yup.boolean().required('Correct status is required')
  //       })
  //     )
  //     .min(1, 'At least one option is required'),
  //   otherwise: Yup.array().of(
  //     Yup.object().shape({
  //       option: Yup.string().nullable(),
  //       is_Correct: Yup.boolean().nullable()
  //     })
  //   ).nullable() // When type is not 'Multiple', options can be null or an empty array
  // }),

  // // Conditional validation for answer based on type
  // answer: Yup.string().when('type', {
  //   is: (type) => ['Essay', 'short Answer'].includes(type),
  //   then: Yup.string().required('Answer is required'),
  //   otherwise: Yup.string().nullable() // When type is not 'Essay' or 'short Answer', answer can be null
  // })
});
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



const QuestionForm = () => {
  const [questionType, setQuestionType] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user=useSelector((state)=>state.user)
  const assessment = useSelector((state) => state.assessment)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  
  const token = useSelector((state) => state.token);
   
  const addQuestion = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/assessment/${user._id}/createQuestion`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        onSubmitProps.resetForm();
        //console.log(data);
      } else {
        const error = await response.json();
        console.error('Error creating question:', error);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  //Publish
  const publish=async ()=>{
    try {
      const user=await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/assessment/${assessment._id}/update`,{
        method:"PUT",
        headers:{
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
        , body: JSON.stringify({ status: "Published" }),
      })
      const result=await user.json()
     dispatch(setAsessment({
      assessment:result
     }))
     notify()
     navigate("/dash")
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  }
  
  const handleFormSubmit=async(values,onSubmitProps)=>{
    await addQuestion(values,onSubmitProps)
    console.log(values);
    }

    const handleClick=()=>{
      publish()
    }
  return (
    <Box m="20px">
     
      <Box  display="flex" justifyContent="start">
      <Button onClick={handleClick}justifyContent="end"sx={{backgroundColor:colors.greenAccent[600],
        color:"black",width:"6rem" ,height:"3rem", fontSize:"1rem"}}>Publish</Button>
      </Box>
      <Question_Bank />
      <Header title="Add Questions" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
       
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(1, 1fr)"
              p="2rem"
              sx={{ border: '1px', borderRadius: '8px' }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Question"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text}
                name="text"
                error={touched.text && Boolean(errors.text)}
                helperText={touched.text && errors.text}
              />
              <TextField
                fullWidth
                select
                label="Difficulty"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.difficulty}
                name="difficulty"
                error={touched.difficulty && Boolean(errors.difficulty)}
                helperText={touched.difficulty && errors.difficulty}
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Subject"
                onBlur={handleBlur} 
                onChange={handleChange}
                value={values.subject}
                name="subject" 
                error={touched.subject && Boolean(errors.subject)}
                helperText={touched.subject && errors.subject} 
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              />
              <TextField
                fullWidth
                select
                label="Add to Question Bank"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isReusable}
                name="isReusable"
                error={touched.isReusable && Boolean(errors.isReusable)}
                helperText={touched.isReusable && errors.isReusable}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
           
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Resource link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resources}
                name="resources"
                error={touched.resources && Boolean(errors.resources)}
                helperText={touched.resources && errors.resources}
              />
              <TextField
                fullWidth
                select
                variant="outlined"
                label="Type"
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('type', e.target.value);
                  setQuestionType(e.target.value);
                }}
                value={values.type}
                name="type"
                error={touched.type && Boolean(errors.type)}
                helperText={touched.type && errors.type}
              >
                <MenuItem value="Multiple">Multiple Choice</MenuItem>
                <MenuItem value="short Answer">Short Answer</MenuItem>
                <MenuItem value="Essay">Essay</MenuItem>
              </TextField>

              {questionType === 'Multiple' && (
                <Box display="flex" flexDirection="column" gap="20px">
                  {values.options.map((option, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gridTemplateColumns="3fr 1fr auto"
                      alignItems="center"
                      gap="10px"
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label={`Option ${index + 1}`}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const options = [...values.options];
                          options[index].option = e.target.value;
                          setFieldValue('options', options);
                        }}
                        value={option.option}
                        name={`options[${index}].option`}
                        error={
                          touched.options &&
                          touched.options[index] &&
                          errors.options &&
                          errors.options[index] &&
                          errors.options[index].option
                        }
                        helperText={
                          touched.options &&
                          touched.options[index] &&
                          errors.options &&
                          errors.options[index] &&
                          errors.options[index].option
                        }
                      />
                      <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="Is Correct?"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const options = [...values.options];
                          options[index].is_Correct = e.target.value === 'true';
                          setFieldValue('options', options);
                        }}
                        value={option.is_Correct ? 'true' : 'false'}
                        name={`options[${index}].is_Correct`}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </TextField>
                      <IconButton
                        color="error"
                        onClick={() => {
                          const options = values.options.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue('options', options);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    sx={{backgroundColor:colors.blueAccent[600]}}
                    onClick={() => {
                      const options = [...values.options, { option: '', is_Correct: false }];
                      setFieldValue('options', options);
                    }}
                  >
                    <AddIcon /> Add Option
                  </Button>
                </Box>
              )}

              {(questionType === 'Essay' || questionType === 'short Answer') && (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Answer"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.answer}
                  name="answer"
                  error={touched.answer && Boolean(errors.answer)}
                  helperText={touched.answer && errors.answer}
                />
              )}

              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Score"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.score}
                name="score"
                error={touched.score && Boolean(errors.score)}
                helperText={touched.score && errors.score}
              />

              <Box display="flex" gap="20px" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                 sx={{backgroundColor:colors.blueAccent[600]}}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
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

export default QuestionForm;
