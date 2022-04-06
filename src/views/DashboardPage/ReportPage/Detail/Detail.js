import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Bonk from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { joinAddress } from "../../../../utils/address";

function Detail({ formik }) {
  return (
    <>
      <Grid container md={12} className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tên kho</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Tên kho"
            disabled
            value={formik.values.storage.name}
            // {...formik.getFieldProps("")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Địa chỉ kho</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Địa chỉ kho"
            disabled
            value={
              formik?.values?.storage?.address &&
              joinAddress(formik.values.storage.address)
            }
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Người thực hiện</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Người thực hiện"
            disabled
            value={formik.values.stocker.name}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thời gian thực hiện</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            disabled
            label="Thời gian thực hiện"
            value={moment(formik.values.createdAt).format("DD/MM/YYYY HH:mm")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thời gian cập nhật</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            disabled
            label="Thời gian cập nhật"
            value={moment(formik.values.updatedAt).format("DD/MM/YYYY HH:mm")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tổng nhập</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            type="number"
            fullWidth
            label="Tổng nhập"
            InputProps={{
              endAdornment: <InputAdornment position="end">lần</InputAdornment>,
            }}
            error={
              formik.touched.total_import && formik.errors.total_import
                ? true
                : false
            }
            helperText={
              formik.touched.total_import && formik.errors.total_import
            }
            {...formik.getFieldProps("total_import")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tổng xuất</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            type="number"
            fullWidth
            label="Tổng xuất"
            InputProps={{
              endAdornment: <InputAdornment position="end">lần</InputAdornment>,
            }}
            error={
              formik.touched.total_export && formik.errors.total_export
                ? true
                : false
            }
            helperText={
              formik.touched.total_export && formik.errors.total_export
            }
            {...formik.getFieldProps("total_export")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
