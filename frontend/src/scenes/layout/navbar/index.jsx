import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setMode,setLogout } from "@/state";
const Navbar = ({ onMenuToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");

  const [anchorEl, setAnchorEl] = useState(null);
  

  // Toggle menu open/close
  const handleMenuToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
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
            <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
            <IconButton type="button">
              <SearchOutlined />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={()=> dispatch(setMode())}>
          {theme.palette.mode === "dark" ?  <DarkModeOutlined />: <LightModeOutlined />}
        </IconButton>
        <IconButton onClick={handleMenuToggle}>
        <PersonOutlined/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuToggle}
      >
        <MenuItem onClick={handleMenuToggle}>Text</MenuItem>
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
