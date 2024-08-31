import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import {tokens} from "@/theme"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setMode,setLogout } from "@/state";
import { useNavigate } from "react-router-dom";
const Navbar = ({ onMenuToggle }) => {
  const theme = useTheme();
  const navigate=useNavigate()
  const colors=tokens(theme.palette.mode);
  const user=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Toggle menu open/close
  const handleMenuToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClick=()=>{
    navigate("/dash")
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" gap={2}>
        {isMdDevices && (
          <IconButton onClick={onMenuToggle}>
            <MenuOutlined />
          </IconButton>
        )}
        {!isXsDevices && (
          <Box display="flex" alignItems="center" bgcolor="primary" borderRadius="3px">
            <Typography onClick={handleClick} sx={{color:colors.blueAccent[600],fontSize:"1.5rem" ,fontWeight:"bold",cursor:"pointer"}}>Assessment Tool</Typography>
            <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
            <IconButton type="button">
              <SearchOutlined />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Avatar sx={{bgcolor:colors.blueAccent[600]}}>{`${user.name[0]}`}</Avatar>
        <IconButton onClick={()=> dispatch(setMode())} >
          {theme.palette.mode === "dark" ?  <DarkModeOutlined sx={{width:"1.5rem",height:"1.5rem"}}/>: <LightModeOutlined sx={{width:"1.5rem",height:"1.5rem"}}/>}
        </IconButton>
        <IconButton onClick={handleMenuToggle}>
        <PersonOutlined sx={{width:"1.8rem",height:"1.8rem"}}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuToggle}
      >
        <MenuItem onClick={handleMenuToggle}>{`${user.name}`}</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setLogout());
            handleMenuToggle();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
