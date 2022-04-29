import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export const ChangeInfo = ({ formik }) => {
  return (
    <Grid container direction="column">
      <Box className="d-flex flex-row py-3 mb-4 align-items-center justify-content-between border-bottom">
        <Typography variant="h6">Thông tin cá nhân</Typography>
        <Button variant="outlined" className="app-outline--success" onClick={formik.submitForm}>
          Lưu lại
        </Button>
      </Box>
      <Grid container md={12} className="mb-4">
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
          <Typography>Tên đường</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Tên đường"
            error={formik.touched.street && formik.errors.street ? true : false}
            helperText={formik.touched.street && formik.errors.street}
            {...formik.getFieldProps("street")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Phường / xã</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Phường / xã"
            error={formik.touched.ward && formik.errors.ward ? true : false}
            helperText={formik.touched.ward && formik.errors.ward}
            {...formik.getFieldProps("ward")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Quận / huyện</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Quận / huyện"
            error={
              formik.touched.province && formik.errors.province ? true : false
            }
            helperText={formik.touched.province && formik.errors.province}
            {...formik.getFieldProps("province")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thành phố</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Thành phố"
            error={formik.touched.city && formik.errors.city ? true : false}
            helperText={formik.touched.city && formik.errors.city}
            {...formik.getFieldProps("city")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
