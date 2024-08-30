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
            {/* Add more routes here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
