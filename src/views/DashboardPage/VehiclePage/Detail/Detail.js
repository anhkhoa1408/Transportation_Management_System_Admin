import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useLocation } from "react-router-dom";

function Detail({ formik, drivers }) {
  const location = useLocation();
  return (
    <>
      <Grid item md={12} className="px-4 d-flex flex-column">
        <Paper className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4 py-2">
            <Grid container md={12} className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Biển số</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  fullWidth
                  label="Biển số"
                  disabled={location?.state?.id}
                  {...formik.getFieldProps("licence")}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Tải trọng</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Tải trọng"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.load && formik.errors.load ? true : false
                  }
                  helperText={formik.touched.load && formik.errors.load}
                  {...formik.getFieldProps("load")}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Loại xe</Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl className="w-100">
                  <InputLabel>Loại xe</InputLabel>
                  <Select
                    fullWidth
                    label="Loại xe"
                    value={formik.values.type}
                    {...formik.getFieldProps("type")}
                  >
                    <MenuItem value="Container">Xe container</MenuItem>
                    <MenuItem value="Truck">Xe tải</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Người quản lý</Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl
                  error={
                    formik.touched.manager && formik.errors.manager
                      ? true
                      : false
                  }
                  className="w-100"
                >
                  <InputLabel>Người quản lý</InputLabel>
                  <Select
                    fullWidth
                    label="Người quản lý"
                    {...formik.getFieldProps("manager")}
                    value={formik.values.manager}
                    onChange={(e) => {
                      formik.setFieldValue("manager", e.target.value);
                    }}
                  >
                    {drivers?.staffs?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formik.errors.manager}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} className="pt-4 px-4 mt-4 d-flex flex-column">
        <Paper className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4 py-2">
            <Box className="my-4">
              <Typography className="fs-5 fw-bold">
                Kích thước thùng hàng
              </Typography>
              <Typography variant="subtitle2 opacity-50">
                Điều chỉnh kích thước xe chở hàng
              </Typography>
            </Box>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Chiều dài</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Chiều dài"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  error={formik.touched.len && formik.errors.len ? true : false}
                  helperText={formik.touched.len && formik.errors.len}
                  {...formik.getFieldProps("len")}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Chiều rộng</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Chiều rộng"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.width && formik.errors.width ? true : false
                  }
                  helperText={formik.touched.width && formik.errors.width}
                  {...formik.getFieldProps("width")}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Chiều cao</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Chiều cao"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.height && formik.errors.height ? true : false
                  }
                  helperText={formik.touched.height && formik.errors.height}
                  {...formik.getFieldProps("height")}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default memo(Detail);
