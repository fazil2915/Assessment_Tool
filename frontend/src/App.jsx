// src/App.js
import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/scenes/Dashboard';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import LandingPage from '@/scenes/landing page';
import Unauthorized from '@/components/Unauthorized';
import Layout from '@/scenes/layout';
import CourseForm from '@/scenes/Teacher/Course';
import Contacts from '@/scenes/Teacher/Assessment';
import Question_Bank from '@/scenes/Teacher/QuestionBank';
import CreateAssessment from "@/scenes/Teacher/Assessment/aessessmentForm"
import QuestionForm from "@/scenes/Teacher/QuestionBank/AddQuestion"
import TeacherSubmission from './scenes/Teacher/submission';
import Calender from "@/scenes/Teacher/Calender"
import StudentAssessment from '@/scenes/Students/Assessment';



const ProtectedRoute = ({ children, role }) => {
  const userRole = useSelector((state) => state.user); // Get the user's role from Redux
  const isAuth = Boolean(useSelector((state) => state.token)); // Check if user is authenticated
 
  
  
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (role && userRole.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
 

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/" element={<Layout/>}>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          {/* Teacher Route*/}
            <Route path="/dash" element={<ProtectedRoute role="teacher"><Dashboard /></ProtectedRoute>} />
            <Route path='/course' element={<ProtectedRoute role="teacher"><CourseForm /></ProtectedRoute>}/>
            <Route path="/assessment" element={<ProtectedRoute role="teacher"><Contacts/></ProtectedRoute>}/>
            <Route path="/question_bank" element={<ProtectedRoute role="teacher"><Question_Bank/></ProtectedRoute>}/>
            <Route path='/create_assessment' element={<ProtectedRoute role="teacher"><CreateAssessment/></ProtectedRoute>}/>
            <Route path='/addquestion' element={<ProtectedRoute role="teacher"><QuestionForm/></ProtectedRoute>}/>
            <Route path='/teachersubmission' element={<ProtectedRoute role="teacher"><TeacherSubmission /></ProtectedRoute>}/>
            <Route path='/calendar' element={<Calender/>}/>

           {/* Students Route*/}
           <Route path='/studentAssessment' element={<ProtectedRoute role="student"><StudentAssessment/></ProtectedRoute>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
