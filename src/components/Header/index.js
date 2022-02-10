import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Typography } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "static",
  boxShadow: "10px 0px 0px 0px",
  backgroundColor: "#FFF",
}));

const Header = (props) => {
  return (
    <AppBar>
      <Toolbar className="d-flex flex-row">
        <Typography variant="h3" className="primary-color">
          Logo
        </Typography>
        <Box
          component="div"
          className="ms-auto d-flex flex-row align-items-center"
        >
          <Notifications className="text-dark me-3" />
          <Avatar
            sx={{
              width: 30,
              height: 30,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
