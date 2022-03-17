import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";

function Detail({ formik }) {
  return (
    <>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Mã đơn hàng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Mã đơn hàng"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item sm={3} md={3} className="align-items-center d-flex flex-row">
          <Typography>Từ</Typography>
        </Grid>
        <Grid item sm={9} md={9}>
          <TextField
            fullWidth
            label="Từ"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item sm={3} md={3} className="align-items-center d-flex flex-row">
          <Typography>Người gửi</Typography>
        </Grid>
        <Grid item sm={9} md={9}>
          <TextField
            fullWidth
            label="Người gửi"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>SDT người gửi</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="SDT người gửi"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Đến</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Đến"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Người nhận</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Người nhận"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>SDT người nhận</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="SDT người nhận"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Vị trí hiện tại</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Vị trí hiện tại"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thời gian đặt hàng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Thời gian đặt hàng"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tổng chi phí</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Tổng chi phí"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Chi phí còn lại</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Chi phí còn lại"
            inputProps={{
              style: {
                backgroundColor: "#F8F9FA",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
