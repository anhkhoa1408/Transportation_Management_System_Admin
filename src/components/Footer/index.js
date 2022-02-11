import { Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Footer() {
  return (
    <Box className="p-5">
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://www.youtube.com/watch?v=J5jRWnwPaw4"
        >
          Shober Delivery
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
