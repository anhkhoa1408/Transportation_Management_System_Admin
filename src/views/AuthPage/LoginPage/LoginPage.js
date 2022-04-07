import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Bonk from "yup";
import { saveInfoSuccess } from "../../../actions/actions";
import Loading from "../../../components/Loading";
import img from "./../../../../src/assets/img/delivery.jpg";
import LOGO from "./../../../../src/assets/img/logo.png";
import authApi from "./../../../api/authApi";
import { errorNotify } from "./../../../utils/notification.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=J5jRWnwPaw4">
        Shober Delivery
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(null);

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      identifier: Bonk.string().required("Bạn chưa nhập tài khoản"),
      password: Bonk.string().required("Bạn chưa nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(<Loading />);
    authApi
      .login(values)
      .then((response) => {
        setLoading(null);
        dispatch(saveInfoSuccess(response));
        history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(null);
        errorNotify("Đăng nhập thất bại");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {loading}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <img alt="" src={LOGO} className="banner-img w-50" />
            <img alt="" src={img} className="banner-img w-75" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }} className="bg-primary">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                // id="email"
                label="Tên đăng nhập"
                // name="email"
                // autoComplete="email"
                autoFocus
                value={formik.values.identifier}
                error={
                  formik.touched.identifier && formik.errors.identifier
                    ? true
                    : false
                }
                helperText={
                  formik.touched.identifier && formik.errors.identifier
                }
                {...formik.getFieldProps("identifier")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#7FC3DC",
                  "&:hover": {
                    backgroundColor: "#7FC3DC",
                    opacity: 0.8,
                  },
                }}
                onClick={formik.submitForm}
              >
                Đăng nhập
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
