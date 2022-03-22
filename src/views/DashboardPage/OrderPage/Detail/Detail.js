import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, {memo} from "react";
import * as Bonk from 'yup'
import { joinAddress } from "../../../../utils/address";
import moment from "moment";

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
            value={formik.values.id}
            {...formik.getFieldProps("id")}
            />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item sm={3} md={3} className="align-items-center d-flex flex-row">
          <Typography>Từ</Typography>
        </Grid>
        <Grid item sm={9} md={9}>
          <TextField
            {...formik.getFieldProps("from_address")}
            disabled
            fullWidth
            label="Từ"
            value={(formik.values.from_address && joinAddress(formik.values.from_address))}
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
            value={formik.values.sender_name}
            error={
              formik.touched.sender_name && formik.errors.sender_name
                ? true
                : false
            }
            helperText={formik.touched.sender_name && formik.errors.sender_name}
            {...formik.getFieldProps("sender_name")}
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
            value={formik.values.sender_phone}
            error={
              formik.touched.sender_phone && formik.errors.sender_phone
                ? true
                : false
            }
            helperText={formik.touched.sender_phone && formik.errors.sender_phone}
            {...formik.getFieldProps("sender_phone")}
          />
        </Grid>
      </Grid>
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Đến</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            {...formik.getFieldProps("to_address")}
            fullWidth
            disabled
            label="Đến"
            value={(formik.values.to_address && joinAddress(formik.values.to_address))}
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
            value={formik.values.receiver_name}
            error={
              formik.touched.receiver_name && formik.errors.receiver_name
                ? true
                : false
            }
            helperText={formik.touched.receiver_name && formik.errors.receiver_name}
            {...formik.getFieldProps("receiver_name")}
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
            value={formik.values.receiver_phone}
            error={
              formik.touched.receiver_phone && formik.errors.receiver_phone
                ? true
                : false
            }
            helperText={formik.touched.receiver_phone && formik.errors.receiver_phone}
            {...formik.getFieldProps("receiver_phone")}
          />
        </Grid>
      </Grid>
      {/* <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Vị trí hiện tại</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Vị trí hiện tại"
          />
        </Grid>
      </Grid> */}
      <Grid container className="mb-4">
        <Grid item md={3} className="align-items-center d-flex flex-row">
          <Typography>Thời gian đặt hàng</Typography>
        </Grid>
        <Grid item md={9}>
          <TextField
            fullWidth
            disabled
            label="Thời gian đặt hàng"
            value={moment(formik.values.createdAt).format("DD/MM/YYYY HH:mm")}
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
            value={formik.values.fee}
            label="Tổng chi phí"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">VND</InputAdornment>
              ),
            }}
            error={
              formik.touched.fee && formik.errors.fee
                ? true
                : false
            }
            helperText={formik.touched.fee && formik.errors.fee}
            {...formik.getFieldProps("fee")}
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
            value={formik.values.remain_fee}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">VND</InputAdornment>
              ),
            }}
            error={
              formik.touched.remain_fee && formik.errors.remain_fee
                ? true
                : false
            }
            helperText={formik.touched.remain_fee && formik.errors.remain_fee}
            {...formik.getFieldProps("remain_fee")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Detail);
