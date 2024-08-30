// src/App.js
import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/scenes/Teacher/loginPage';
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
            <Route path="/dash" element={<Dashboard />} />
            <Route path='/course' element={<CourseForm/>}/>
            <Route path="/assessment" element={<Contacts/>}/>
            <Route path="/question_bank" element={<Question_Bank/>}/>
            {/* Add more routes here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
