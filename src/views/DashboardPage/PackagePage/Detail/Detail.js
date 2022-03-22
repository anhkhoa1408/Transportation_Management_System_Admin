import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { packages } from "../../../../utils/package";

function Detail({ formik }) {
  return (
    <Box className="px-5 py-2">
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Mã QR</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Mã QR"
            {...formik.getFieldProps("id")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tên kiện hàng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Tên kiện hàng"
            {...formik.getFieldProps("name")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Chiều dài</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Chiều dài"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            error={
              formik.touched.len && formik.errors.len
                ? true
                : false
            }
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
            fullWidth
            label="Chiều rộng"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            error={
              formik.touched.width && formik.errors.width
                ? true
                : false
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
            fullWidth
            label="Chiều cao"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            error={
              formik.touched.height && formik.errors.height
                ? true
                : false
            }
            helperText={formik.touched.height && formik.errors.height}
            {...formik.getFieldProps("height")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Số lượng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Số lượng"
            InputProps={{
              endAdornment: <InputAdornment position="end">cái</InputAdornment>,
            }}
            error={
              formik.touched.quantity && formik.errors.quantity
                ? true
                : false
            }
            helperText={formik.touched.quantity && formik.errors.quantity}
            {...formik.getFieldProps("quantity")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Khối lượng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Khối lượng"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            error={
              formik.touched.weight && formik.errors.weight
                ? true
                : false
            }
            helperText={formik.touched.weight && formik.errors.weight}
            {...formik.getFieldProps("weight")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Loại</Typography>
        </Grid>
        <Grid item md={9}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            label="Loại"
            value={formik.values.package_type}
            {...formik.getFieldProps("package_type")}
          >
            {packages.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {/* <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Ghi chú</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Ghi chú"
            {...formik.getFieldProps("note")}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default Detail;
