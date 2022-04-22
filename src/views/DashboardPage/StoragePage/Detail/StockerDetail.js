import {
  Grid,
  InputAdornment,
  MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";
import React from "react";
import { joinAddress } from "../../../../utils/address";

const StockerDetail = ({ formik, stockers, selectStockers, handleChangeStocker }) => {
  return (
    <>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tên kho</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Tên kho"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            {...formik.getFieldProps("name")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            {...formik.getFieldProps("address")}
            fullWidth
            label="Địa chỉ"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            value={formik.values.address && joinAddress(formik.values.address)}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Diện tích</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            type="number"
            fullWidth
            label="Diện tích"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">m²</InputAdornment>
              ),
            }}
            {...formik.getFieldProps("size")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Ngày thành lập</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Ngày thành lập"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            {...formik.getFieldProps("createdAt")}
            value={moment(formik.values.createdAt).format("DD/MM/YYYY")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StockerDetail;
