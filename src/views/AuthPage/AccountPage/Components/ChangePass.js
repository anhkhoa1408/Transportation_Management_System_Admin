import {
  Box,
  Button, Grid, TextField,
  Typography
} from "@mui/material";
import React from "react";

export const ChangePass = ({ formik, ...props }) => {
  return (
    <Grid container direction="column">
      <Box className="d-flex flex-row py-3 mb-4 align-items-center justify-content-between border-bottom">
        <Typography variant="h6">Đổi mật khẩu</Typography>
        <Button variant="outlined" onClick={formik.submitForm}>Lưu lại</Button>
      </Box>
      <Grid container md={12} className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Mật khẩu hiện tại</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu hiện tại"
            error={formik.touched.currPass && formik.errors.currPass ? true : false}
            helperText={formik.touched.currPass && formik.errors.currPass}
            {...formik.getFieldProps("currPass")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Mật khẩu mới</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu mới"
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps("password")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Xác nhận mật khẩu</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            type="password"
            label="Xác nhận mật khẩu"
            error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            {...formik.getFieldProps("newPassword")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
