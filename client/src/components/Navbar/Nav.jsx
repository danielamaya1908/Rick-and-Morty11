import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../../context/AuthContext";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "#fff",
      fontWeight: 700,
      fontSize: 18,
      boxShadow: 3,
    },
    children: name ? (
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    ) : (
      <PersonIcon />
    ),
  };
}

function Nav({ onCloseAll }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    onCloseAll();
    navigate("/login");
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#181c2b", boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            component={NavLink}
            to="/home"
            color={pathname === "/home" ? "secondary" : "inherit"}
            variant={pathname === "/home" ? "contained" : "text"}
            sx={{ mx: 1, fontWeight: 700, borderRadius: 3 }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/favorites"
            color={pathname === "/favorites" ? "secondary" : "inherit"}
            variant={pathname === "/favorites" ? "contained" : "text"}
            sx={{ mx: 1, fontWeight: 700, borderRadius: 3 }}
          >
            Favorites
          </Button>
          <Button
            component={NavLink}
            to="/about"
            color={pathname === "/about" ? "secondary" : "inherit"}
            variant={pathname === "/about" ? "contained" : "text"}
            sx={{ mx: 1, fontWeight: 700, borderRadius: 3 }}
          >
            About
          </Button>
        </Box>
        {auth.token && (
          <Box>
            <Tooltip title="Opciones de usuario" arrow>
              <IconButton onClick={handleMenu} size="large" sx={{ ml: 2 }}>
                <Avatar {...stringAvatar(auth.user?.name || "User")} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  bgcolor: "#23263a",
                  color: "#fff",
                  minWidth: 200,
                  borderRadius: 3,
                  boxShadow: 6,
                },
              }}
            >
              <MenuItem
                disabled
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  py: 2,
                  bgcolor: "#23263a",
                  width: "100%",
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: 2,
                }}
              >
                <Avatar
                  {...stringAvatar(auth.user?.name || "User")}
                  sx={{
                    width: 48,
                    height: 48,
                    mb: 1,
                    boxShadow: 4,
                    bgcolor: stringToColor(auth.user?.name || "User"),
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#b0b3c6",
                    fontWeight: 400,
                    letterSpacing: 2,
                    mb: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Usuario
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    color: "#fff",
                    fontSize: 22,
                    letterSpacing: 1,
                    textShadow: "0 2px 8px #0008",
                  }}
                >
                  {auth.user?.name || "User"}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ color: "#ff1744", fontWeight: 700, mt: 1 }}
              >
                <LogoutIcon sx={{ mr: 1 }} /> Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
