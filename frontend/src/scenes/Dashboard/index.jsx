import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
  PieChart,
  GeographyChart,
} from "../../components";
import {
  DownloadOutlined,
  PersonAddRounded,
  BookRounded,
  LibraryBooksRounded,
  FeedbackRounded,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { tokens } from "@/theme";
import SideBar from "../layout/sidebar";
 

function Dashboard() {
  const theme = useTheme();
  const user=useSelector((state)=>state.user)
  const colors = tokens(theme.palette.mode);
  const role=user.role=== "student"
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  return (
    <Box ml="2rem">
      <Box display="flex" justifyContent="space-between">
      <Header title={`${user.role ? user.role.toUpperCase() : "USER"} DASHBOARD`} subtitle="Welcome to your dashboard" />

        {!isXsDevices && (
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: isMdDevices ? "14px" : "10px",
                fontWeight: "bold",
                p: "10px 20px",
                mt: "18px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              startIcon={<DownloadOutlined />}
            >
              DOWNLOAD REPORTS
            </Button>
          </Box>
        )}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
              ? "repeat(6, 1fr)"
              : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Statistic Items */}
        {!role && (
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="11,361"
            subtitle="Assessment Rate"
            progress="0.75"
            increase="+14%"
            icon={
              <LibraryBooksRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {role && (
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="Assessment Waiting"
            progress="0.75"
            increase="+14%"
            icon={
              <LibraryBooksRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {!role && (
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Course"
            progress="0.50"
            increase="+21%"
            icon={
              <BookRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {role && (
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Course Enrolled"
            progress="0.50"
            increase="+21%"
            icon={
              <BookRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {!role &&(
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="No of Students"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {role &&(
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Grade rate"
            progress="0.30"
            increase="+5%"
            icon={
              <LibraryBooksRounded
              sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {!role && (
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Feedback Given"
            progress="0.80"
            increase="+43%"
            icon={
              <FeedbackRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
        {role && (
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Feedbacks"
            progress="0.80"
            increase="+43%"
            icon={
              <FeedbackRounded
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>)}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SideBar role={role} />
        </Grid>
        <Grid item xs={12} md={9} mt={20}> {!role&&(
          <BarChart isDashboard={true} />)}
        </Grid>
      </Grid>
    </Box>
   
    </Box>
  );
}

export default Dashboard;
