// src/App.js
import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/scenes/Dashboard';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import LandingPage from '@/scenes/landing page';
import Layout from '@/scenes/layout';
import CourseForm from '@/scenes/Teacher/Course';
import Contacts from '@/scenes/Teacher/Assessment';
import Question_Bank from '@/scenes/Teacher/QuestionBank';
import CreateAssessment from "@/scenes/Teacher/Assessment/aessessmentForm"
import QuestionForm from "@/scenes/Teacher/QuestionBank/AddQuestion"
import TeacherSubmission from './scenes/Teacher/submission';
import Calender from "@/scenes/Teacher/Calender"
import StudentAssessment from '@/scenes/Students/Assessment';
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/" element={<Layout/>}>
          {/* Teacher Route*/}
            <Route path="/dash" element={<Dashboard />} />
            <Route path='/course' element={<CourseForm/>}/>
            <Route path="/assessment" element={<Contacts/>}/>
            <Route path="/question_bank" element={<Question_Bank/>}/>
            <Route path='/create_assessment' element={<CreateAssessment/>}/>
            <Route path='/addquestion' element={<QuestionForm/>}/>
            <Route path='/teachersubmission' element={<TeacherSubmission/>}/>
            <Route path='/calendar' element={<Calender/>}/>

           {/* Students Route*/}
           <Route path='/studentAssessment' element={<StudentAssessment/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
