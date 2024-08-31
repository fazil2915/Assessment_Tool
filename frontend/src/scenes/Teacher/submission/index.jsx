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
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user)

    return (
        <Box m="20px">
            <Header title="Submission List" subtitle="Submission made by teacher" />
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2, // Adjust gap for spacing between cards
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' // Responsive grid layout
                    }}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 1
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 1 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 2
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 2 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 3
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 3 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {/* Add more cards as needed */}
                </Box>
            </Box>
            {/*second row */}
            <Header title="Submission List" subtitle="Submission made by teacher" />
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2, // Adjust gap for spacing between cards
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' // Responsive grid layout
                    }}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 1
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 1 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 2
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 2 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course 3
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Course 3 description goes here. Provide some meaningful content.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {/* Add more cards as needed */}
                </Box>
            </Box>

        </Box>
    );
};

export default TeacherSubmission;
