
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
} from "@mui/icons-material";

import Item from "./Item";


const SideBar = ({role}) => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
     
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {!role&&(
          <Item
            title="Courses"
            path="/course"
            colors={colors}
            icon={<DashboardOutlined />}
          />)}
          {role&&(
          <Item
            title="Courses"
            path="/studentcourse"
            colors={colors}
            icon={<DashboardOutlined />}
          />)}
        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>{" "} */}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {!role&&(
          <Item
            title="Assessments"
            path="/assessment"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />)}

          {role&&(
          <Item
            title="Assessments"
            path="/studentAssessment"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />)}
          {!role &&(
          <Item
            title="Question Bank"
            path="/question_bank"
            colors={colors}
            icon={<ContactsOutlined />}
          />)}
          {!role&&(
          <Item
            title="Submission"
            path="/submission"
            colors={colors}
            icon={<ReceiptOutlined />}
          />)}

          {role&&(
          <Item
            title="Submission"
            path="/studentSubmission"
            colors={colors}
            icon={<ReceiptOutlined />}
          />)}
        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography> */}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {!role&& (
          <Item
            title="Setings"
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />)}
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          {!role&&(
          <Item
            title="Grade"
            path="/faq"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />)}
          {role&&(
          <Item
            title="Grade"
            path="/studentGrade"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />)}
        </Menu>


        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Charts" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
          <Item
            title="Stream Chart"
            path="/stream"
            colors={colors}
            icon={<WavesOutlined />}
          />
        </Menu> */}
      </Box>
     
    </Sidebar>
  );
};

export default SideBar;
