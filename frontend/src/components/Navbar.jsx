import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const Navbar = () => {

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">
          Store Rating App
        </Typography>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;