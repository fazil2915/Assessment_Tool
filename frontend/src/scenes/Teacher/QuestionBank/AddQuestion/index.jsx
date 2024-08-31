import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, IconButton,useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Header } from "@/components";
import { useSelector } from 'react-redux';
import { tokens } from '@/theme';

const initialValues = {
  title: '',
  description: '',
  resources: '',
  type: '',
  difficulty: '',
  subject: '',
  category: '',
  score: '',
  options: [{ option: '', is_Correct: false }],
  answer: ''
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  resources: Yup.string().url('Invalid URL'),
  type: Yup.string().required('Required'),
  difficulty: Yup.string().required('Required'),
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
    <Box m="1rem">
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
              sx={{ border: '1px solid #ddd', borderRadius: '8px' }}
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
                error={touched.title && errors.title}
                helperText={touched.title && errors.title}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && errors.description}
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
                error={touched.resources && errors.resources}
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
                error={touched.type && errors.type}
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
                        onClick={() => {
                          const options = [...values.options];
                          options.splice(index, 1);
                          setFieldValue('options', options);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    sx={{backgroundColor:colors.greenAccent[600]}}
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setFieldValue('options', [
                        ...values.options,
                        { option: '', is_Correct: false }
                      ]);
                    }}
                  >
                    Add Option
                  </Button>
                </Box>
              )}

              {['Essay', 'short Answer'].includes(questionType) && (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Answer"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.answer}
                  name="answer"
                  error={touched.answer && errors.answer}
                  helperText={touched.answer && errors.answer}
                />
              )}
            </Box>
            <Box mt="2rem" textAlign="center">
              <Button
                type="submit"
                sx={{ backgroundColor:colors.blueAccent[600] }}
                variant="contained"
              >
                Add Question
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default QuestionForm;
