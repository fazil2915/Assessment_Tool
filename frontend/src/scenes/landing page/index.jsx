import React, { useState } from 'react';
import { Container, Typography, Button, Box,Grid } from '@mui/material';
import { Person as PersonIcon, School as SchoolIcon } from '@mui/icons-material';
import TeacherLogin from '@/scenes/Teacher/loginPage'; 
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
          {/* <Typography variant="h4" component="h1" gutterBottom sx={{ display:"flex",justifyContent:"center",alignContent:"center"}}>
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
          </Box> */}
       
       <Box >
      <Grid container alignItems="center" spacing={4}>
        {/* Left side: Image */}
        <Grid item xs={12} md={6}>
          <img src="/hero.jpg" alt="Hero" style={{ width: "100%", height: "70rem", objectFit:"fill"}} />
        </Grid>

        {/* Right side: Text and Buttons */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Streamline Your <br /> Assessments.
          </Typography>
          <Typography variant="h6" color="textSecondary" mt={2} mb={3}>
            Simplify, Organize, and Enhance Your Assessment Experience.
          </Typography>

          {/* Buttons */}
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
            <Button variant="outlined" size="large">
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>
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
