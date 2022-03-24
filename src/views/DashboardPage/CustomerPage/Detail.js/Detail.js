import {
  FormControl, Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import TimePicker from "../../../../components/DatePicker";
import { joinAddress } from "../../../../utils/address";

function Detail({ formik }) {
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
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            disabled
            fullWidth
            label="Địa chỉ"
            value={
              formik?.values?.address && joinAddress(formik.values.address)
            }
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thuộc kho</Typography>
        </Grid>
        <Grid item md={9}>
          <TimePicker
            label="Ngày sinh"
            value={moment(formik.values.birthday).format("YYYY-MM-DD")}
            setValue={(e) =>
              formik.setFieldValue(
                "birthday",
                moment(e["$d"]).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
              )
            }
          />
        </Grid>
      </Grid>

      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Loại thành viên</Typography>
        </Grid>
        <Grid item md={9}>
          <FormControl className="w-100">
            <InputLabel>Loại thành viên</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              label="Loại thành viên"
              {...formik.getFieldProps("type")}
            >
              <MenuItem value={"Iron"}>Thành viên bạc</MenuItem>
              <MenuItem value={"Gold"}>Thành viên vàng</MenuItem>
              <MenuItem value={"Diamond"}>VIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
