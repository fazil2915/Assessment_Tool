import React, { useEffect, useState } from "react";
import {
    Box, useTheme,
    Card,
    CardContent,
    Typography,
    CardActionArea,
} from "@mui/material";
import { Header } from "@/components";
import { tokens } from "@/theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TeacherSubmission = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
 
    

    // State to hold the fetched courses
    const [assessment, setAssessment] = useState([]);

    useEffect(()=>{
    getAssessments()
    },[])
    //submision
    const getAssessments=async()=>{
        try {
            const assess=await fetch(`${import.meta.env.VITE_BASE_URL}/api/teacher/assessment/${user._id}/getpublished`,{
                method:"GET",
                
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                
            })
            const assessment=await assess.json()
            setAssessment(assessment)
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    }

    return (
        <Box m="20px">
            <Header title="Submissions" subtitle="Submission made by teacher" />
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2, // Adjust gap for spacing between cards
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' // Responsive grid layout
                    }}
                >
                    {assessment.map((assessment, index) => (
                        <Card key={index} sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {assessment.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {assessment.status}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>
            {/*second row */}

        </Box>
    );
};

export default TeacherSubmission;
