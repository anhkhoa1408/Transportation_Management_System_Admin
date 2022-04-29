import {
  FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function Detail({ formik, storage }) {
  const location = useLocation();
  return (
    <>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Họ và tên</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Họ và tên"
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps("name")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tên tài khoản</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Tên tài khoản"
            error={
              formik.touched.username && formik.errors.username ? true : false
            }
            helperText={formik.touched.username && formik.errors.username}
            {...formik.getFieldProps("username")}
          />
        </Grid>
      </Grid>
      {location?.state?.create && (
        <Grid container className="mb-4">
          <Grid item md={3} className="align-items-center d-flex flex-row">
            <Typography>Mật khẩu</Typography>
          </Grid>
          <Grid item md={9}>
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps("password")}
            />
          </Grid>
        </Grid>
      )}
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Địa chỉ email</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Email"
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps("email")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Số điện thoại</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Số điện thoại"
            error={formik.touched.phone && formik.errors.phone ? true : false}
            helperText={formik.touched.phone && formik.errors.phone}
            {...formik.getFieldProps("phone")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thuộc kho</Typography>
        </Grid>
        <Grid item md={9}>
          <FormControl
            error={
              formik.touched.storage && formik.errors.storage ? true : false
            }
            className="w-100"
          >
            <InputLabel>Kho</InputLabel>
            <Select
              fullWidth
              label="Kho"
              {...formik.getFieldProps("storage")}
              value={formik.values.storage}
              onChange={(e) => {
                formik.setFieldValue("storage", e.target.value);
              }}
            >
              {storage.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.errors.storage}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Chức vụ</Typography>
        </Grid>
        <Grid item md={9}>
          <FormControl className="w-100">
            <InputLabel>Chức vụ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              label="Chức vụ"
              {...formik.getFieldProps("type")}
            >
              <MenuItem value={"Stocker"}>Thủ kho</MenuItem>
              <MenuItem value={"Driver"}>Người vận chuyển</MenuItem>
              <MenuItem value={"Assistance"}>Người hỗ trợ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
