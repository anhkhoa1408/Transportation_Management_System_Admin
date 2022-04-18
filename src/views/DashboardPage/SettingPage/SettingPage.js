import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Bonk from "yup";
import authApi from "../../../api/authApi";
import { errorNotify, successNotify } from "../../../utils/notification";

function SettingPage() {
  const [data, setData] = useState({
    point: {
      silver: 500,
      gold: 1000,
      diamond: 2000,
      platinum: 4000,
    },
    furlough: {
      days_before: 2,
      days_limit: 6,
    },
    oil: {
      base: 1000,
      current: 5000,
    },
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data.point,
      ...data.furlough,
      ...data.oil,
    },
    validationSchema: Bonk.object({
      silver: Bonk.number()
        .required("Chưa nhập điểm")
        .min(1, "Điểm lớn hơn 0")
        .test("point-test", "Điểm không hợp lệ", (value, ctx) =>
          handlePointCheck(value, ctx),
        ),
      gold: Bonk.number()
        .required("Chưa nhập điểm")
        .min(1, "Điểm lớn hơn 0")
        .test("point-test", "Điểm không hợp lệ", (value, ctx) =>
          handlePointCheck(value, ctx),
        ),
      diamond: Bonk.number()
        .required("Chưa nhập điểm")
        .min(1, "Điểm lớn hơn 0")
        .test("point-test", "Điểm không hợp lệ", (value, ctx) =>
          handlePointCheck(value, ctx),
        ),
      platinum: Bonk.number()
        .required("Chưa nhập điểm")
        .min(1, "Điểm lớn hơn 0")
        .test("point-test", "Điểm không hợp lệ", (value, ctx) =>
          handlePointCheck(value, ctx),
        ),
      days_before: Bonk.number()
        .min(1, "Số ngày cần lớn hơn 0")
        .required("Chưa nhập ngày"),
      days_limit: Bonk.number()
        .min(1, "Số ngày cần lớn hơn 0")
        .required("Chưa nhập ngày"),
      base: Bonk.number()
        .required("Chưa nhập giá xăng")
        .min(1000, "Mệnh giá không hợp lệ"),
      current: Bonk.number()
        .required("Chưa nhập giá xăng")
        .min(1000, "Mệnh giá không hợp lệ"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handlePointCheck = (value, ctx) => {
    switch (ctx.path) {
      case "silver":
        return ![
          ctx.parent.gold,
          ctx.parent.diamond,
          ctx.parent.platinum,
        ].filter((item) => item <= value).length;
      case "gold":
        return ![ctx.parent.diamond, ctx.parent.platinum].filter(
          (item) => item <= value,
        ).length;
      case "diamond":
        return ctx.parent.platinum > value;
      default:
        return true;
    }
  };
  const handleSubmit = (values) => {
    let {
      silver,
      gold,
      diamond,
      platinum,
      days_before,
      days_limit,
      current,
      base,
    } = values;

    let data = {
      oil: {
        current,
        base,
      },
      furlough: {
        days_before,
        days_limit,
      },
      point: { silver, gold, diamond, platinum },
    };

    console.log(data);

    authApi
      .updateConfig(data)
      .then((response) => {
        successNotify("Cập nhật thành công");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  useEffect(() => {
    authApi
      .getConfig()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        errorNotify("Không lấy được thiết lập");
      });
  }, []);

  return (
    <Grid container className="p-5">
      <Grid item sm={12} md={12} className="px-5 py-2">
        <Paper className="shadow-sm mb-3 py-4 px-5">
          <Box className="pt-2 pb-4 d-flex flex-row align-items-center justify-content-between">
            <Box>
              <Typography variant="h6">Điểm thành viên</Typography>
              <Typography variant="subtitle2">
                Điều chỉnh mức điểm thành viên cho người dùng
              </Typography>
            </Box>
            <Button
              onClick={formik.submitForm}
              variant="outlined"
              color="success"
            >
              Lưu
            </Button>
          </Box>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Thành viên bạc</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Thành viên bạc"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Điểm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.silver && formik.errors.silver ? true : false
                  }
                  helperText={formik.touched.silver && formik.errors.silver}
                  {...formik.getFieldProps("silver")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Thành viên vàng</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Thành viên vàng"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Điểm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.gold && formik.errors.gold ? true : false
                  }
                  helperText={formik.touched.gold && formik.errors.gold}
                  {...formik.getFieldProps("gold")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Thành viên kim cương</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Thành viên kim cương"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Điểm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.diamond && formik.errors.diamond
                      ? true
                      : false
                  }
                  helperText={formik.touched.diamond && formik.errors.diamond}
                  {...formik.getFieldProps("diamond")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Thành viên bạch kim</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Thành viên bạch kim"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Điểm</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.platinum && formik.errors.platinum
                      ? true
                      : false
                  }
                  helperText={formik.touched.platinum && formik.errors.platinum}
                  {...formik.getFieldProps("platinum")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item sm={12} md={12} className="px-5 py-2">
        <Paper className="shadow-sm mb-3 py-4 px-5">
          <Box className="pt-2 pb-4 d-flex flex-row align-items-center justify-content-between">
            <Box>
              <Typography variant="h6">Mức tăng giá xăng</Typography>
              <Typography variant="subtitle2">
                Điều chỉnh giá xăng cũ và giá xăng hiện tại
              </Typography>
            </Box>
            <Button
              onClick={formik.submitForm}
              variant="outlined"
              color="success"
            >
              Lưu
            </Button>
          </Box>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Giá xăng cũ</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Giá xăng cũ"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.base && formik.errors.base ? true : false
                  }
                  helperText={formik.touched.base && formik.errors.base}
                  {...formik.getFieldProps("base")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Giá xăng hiện tại</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Giá xăng hiện tại"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.current && formik.errors.current
                      ? true
                      : false
                  }
                  helperText={formik.touched.current && formik.errors.current}
                  {...formik.getFieldProps("current")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item sm={12} md={12} className="px-5 py-2">
        <Paper className="shadow-sm mb-3 py-4 px-5">
          <Box className="pt-2 pb-4 d-flex flex-row align-items-center justify-content-between">
            <Box>
              <Typography variant="h6">Nghỉ phép</Typography>
              <Typography variant="subtitle2">
                Điều chỉnh yêu cầu khi nghỉ phép của nhân viên
              </Typography>
            </Box>
            <Button
              onClick={formik.submitForm}
              variant="outlined"
              color="success"
            >
              Lưu
            </Button>
          </Box>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Số ngày báo trước</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Số ngày báo trước"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Ngày</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.days_before && formik.errors.days_before
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.days_before && formik.errors.days_before
                  }
                  {...formik.getFieldProps("days_before")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container className="mb-4">
              <Grid item md={3} className="align-items-center d-flex flex-row">
                <Typography>Ngày nghỉ tối đa</Typography>
              </Grid>
              <Grid item md={9}>
                <TextField
                  type="number"
                  fullWidth
                  label="Ngày nghỉ tối đa"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Ngày</InputAdornment>
                    ),
                  }}
                  error={
                    formik.touched.days_limit && formik.errors.days_limit
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.days_limit && formik.errors.days_limit
                  }
                  {...formik.getFieldProps("days_limit")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SettingPage;
