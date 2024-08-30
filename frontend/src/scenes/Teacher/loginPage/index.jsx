import {Box,Typography,useTheme} from "@mui/material"
import Form from "./Form"

const TeacherLoginPage=()=>{
const theme = useTheme()

return <Box>
    <Box width="100%" backgroundColor={theme.palette.background.alt}
    p="1rem" textAlign="center">
    <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          >
          Assessment_Tool
        </Typography>
    </Box>
    <Box
    width={"50%"}
    p="2rem"
    m="2rem auto"
    borderRadius="1.5rem"
    backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight="500" variant="h5" sx={{mb:"1rem"}}>
        Welcome to assessment tool
        </Typography>
       <Form/>
    </Box>
</Box>
}

export default TeacherLoginPage