import React from "react";
import { Audio } from "react-loader-spinner";
import { Typography } from "@mui/material";

export default function LoadingTable(props) {
  return props.loading ? (
    <div className="d-flex flex-column align-items-center justify-content-center loading-table bg-white p-3">
      <Audio
        wrapperClass="mb-3"
        heigth="150"
        width="150"
        color="#7fc3dc"
        ariaLabel="loading"
      />
      <Typography className="app-primary-color">
        Xin vui lòng đợi trong giây lát
      </Typography>
    </div>
  ) : null;
}
