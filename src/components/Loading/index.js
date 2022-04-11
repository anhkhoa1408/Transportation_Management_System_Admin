import React from "react";
import { Audio } from "react-loader-spinner";
import { Typography } from "@mui/material";

export default function Loading({ message = "" }) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center bg-white h-100 w-100 position-fixed top-0 bottom-0 start-0 end-0"
      style={{ zIndex: 9999 }}
    >
      <Audio
        wrapperClass="mb-3"
        heigth="150"
        width="150"
        color="#7fc3dc"
        ariaLabel="loading"
      />
      <Typography className="app-primary-color">
        {message ? message : "Xin vui lòng đợi trong giây lát"}
      </Typography>
    </div>
  );
}
