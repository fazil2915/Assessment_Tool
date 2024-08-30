import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Person as PersonIcon, School as SchoolIcon } from '@mui/icons-material';
import TeacherLogin from '@/scenes/Teacher/loginPage'; // Import your components
import StudentLogin from '@/scenes/Students/loginPage';

const LandingPage = () => {
  const [currentView, setCurrentView] = useState('landing');

  const handleTeacherLogin = () => {
    setCurrentView('teacherLogin');
  };

  const handleStudentLogin = () => {
    setCurrentView('studentLogin');
  };

  return (
    <Box>
      {currentView === 'landing' && (
        <>
          <Typography variant="h4" component="h1" gutterBottom sx={{ display:"flex",justifyContent:"c",alignContent:"center"}}>
            Welcome to the Assessment Portal
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonIcon />}
              onClick={handleTeacherLogin}
              style={styles.button}
            >
              Teacher Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SchoolIcon />}
              onClick={handleStudentLogin}
              style={styles.button}
            >
              Student Login
            </Button>
          </Box>
        </>
      )}

      {currentView === 'teacherLogin' && <TeacherLogin />}
      {currentView === 'studentLogin' && <StudentLogin />}
      </Box>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    width: '150px',
    height: '50px',
  },
};

export default LandingPage;
