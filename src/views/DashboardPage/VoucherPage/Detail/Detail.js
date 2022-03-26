import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import * as Bonk from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { joinAddress } from "../../../../utils/address";
import TimePicker from "./../../../../components/DatePicker";

function Detail({ formik }) {
  return (
    <>
      <Grid container md={12} className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Tên mã giảm giá</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Tên"
            value={formik.values.name}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name}
            {...formik.getFieldProps("name")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Mô tả</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Mô tả"
            value={formik.values.description}
            error={formik.errors.description ? true : false}
            helperText={formik.errors.description}
            {...formik.getFieldProps("description")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Giảm giá</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            type="number"
            fullWidth
            label="Giảm giá"
            value={formik.values.sale}
            error={formik.errors.sale ? true : false}
            helperText={formik.errors.sale}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.values.sale_type === "percentage" ? "%" : "VND"}
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("sale")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Giảm giá tối đa</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            type="number"
            fullWidth
            label="Tối đa"
            value={formik.values.sale_max}
            error={formik.errors.sale_max ? true : false}
            helperText={formik.errors.sale_max}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">VND</InputAdornment>
              ),
            }}
            {...formik.getFieldProps("sale_max")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Đơn tối thiểu</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            type="number"
            fullWidth
            label="Tối thiểu"
            value={formik.values.minimum_order}
            error={formik.errors.minimum_order ? true : false}
            helperText={formik.errors.minimum_order}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">VND</InputAdornment>
              ),
            }}
            {...formik.getFieldProps("minimum_order")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Loại hình giảm giá</Typography>
        </Grid>
        <Grid item md={9}>
          <FormControl
            error={formik.errors.sale_type ? true : false}
            className="w-100"
          >
            <InputLabel>Loại hình</InputLabel>
            <Select
              fullWidth
              label="Loại hình"
              {...formik.getFieldProps("sale_type")}
              value={formik.values.sale_type}
              onChange={(e) => {
                formik.setFieldValue("sale_type", e.target.value);
              }}
            >
              <MenuItem value="percentage">Theo phần trăm</MenuItem>
              <MenuItem value="value">Theo giá trị đơn vận chuyển</MenuItem>
            </Select>
            <FormHelperText>{formik.errors.sale_type}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Loại hình khách hàng</Typography>
        </Grid>
        <Grid item md={9}>
          <FormControl
            error={formik.errors.customer_type ? true : false}
            className="w-100"
          >
            <InputLabel>Loại hình</InputLabel>
            <Select
              fullWidth
              label="Loại hình"
              {...formik.getFieldProps("customer_type")}
              value={formik.values.customer_type}
              onChange={(e) => {
                formik.setFieldValue("customer_type", e.target.value);
              }}
            >
              <MenuItem value="All">Tất cả khách hàng</MenuItem>
              <MenuItem value="Iron">Thành viên bạc</MenuItem>
              <MenuItem value="Gold">Thành viên vàng</MenuItem>
              <MenuItem value="Diamond">Thành viên VIP</MenuItem>
            </Select>
            <FormHelperText>{formik.errors.customer_type}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Ngày hết hạn</Typography>
        </Grid>
        <Grid item md={9}>
          <TimePicker
            label="Ngày hết hạn"
            value={moment(formik.values.expired).format("YYYY-MM-DD")}
            setValue={(e) =>
              formik.setFieldValue(
                "expired",
                moment(e["$d"]).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
              )
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
