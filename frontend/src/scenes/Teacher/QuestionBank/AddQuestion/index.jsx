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

const initialValues = {
  title: '',
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
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  resources: Yup.string().url('Invalid URL'),
  type: Yup.string().required('Required'),
  difficulty: Yup.string().required('Required'),
  isReusable: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
  score: Yup.number().min(0, 'Must be positive').required('Required'),
  options: Yup.array().when('type', {
    is: 'Multiple',
    then: Yup.array().of(
      Yup.object().shape({
        option: Yup.string().required('Option text is required'),
        is_Correct: Yup.boolean()
      })
    ).required('Options are required')
  }),
  answer: Yup.string().when('type', {
    is: val => ['Essay', 'short Answer'].includes(val),
    then: Yup.string().required('Answer is required')
  })
});

const QuestionForm = () => {
  const [questionType, setQuestionType] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useSelector((state) => state.token);

  return (
    <Box m="20px">
      <Question_Bank />
      <Header title="Add Questions" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
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
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
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
    </Box>
  );
};

export default QuestionForm;
