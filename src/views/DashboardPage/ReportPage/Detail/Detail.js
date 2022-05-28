import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { joinAddress } from "../../../../utils/address";
import { convertReportType } from "../../../../utils/report";

function Detail({ formik, storages }) {
  const location = useLocation();
  return (
    <>
      {location?.state?.id ? (
        <>
          <Grid container md={12} className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Tên kho</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                fullWidth
                label="Tên kho"
                disabled
                value={formik.values.storage.name}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Địa chỉ kho</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
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
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Người thực hiện</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                fullWidth
                label="Người thực hiện"
                disabled
                value={formik.values.stocker.name}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Thời gian thực hiện</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                fullWidth
                disabled
                label="Thời gian thực hiện"
                value={moment(formik.values.createdAt).format(
                  "DD/MM/YYYY HH:mm",
                )}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Thời gian cập nhật</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                fullWidth
                disabled
                label="Thời gian cập nhật"
                value={moment(formik.values.updatedAt).format(
                  "DD/MM/YYYY HH:mm",
                )}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Loại báo cáo</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                fullWidth
                disabled
                label="Loại báo cáo"
                value={convertReportType(formik.values.type)}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Tổng nhập</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                disabled
                type="number"
                fullWidth
                label="Tổng nhập"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lần</InputAdornment>
                  ),
                }}
                {...formik.getFieldProps("total_import")}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Tổng xuất</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                disabled
                type="number"
                fullWidth
                label="Tổng xuất"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lần</InputAdornment>
                  ),
                }}
                {...formik.getFieldProps("total_export")}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Danh sách kho</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <FormControl
                error={
                  formik.touched.storage && formik.errors.storage ? true : false
                }
                className="w-100"
              >
                <InputLabel>Danh sách kho</InputLabel>
                <Select
                  fullWidth
                  label="Danh sách kho"
                  {...formik.getFieldProps("storage")}
                  value={formik.values.storage}
                  onChange={(e) => {
                    formik.setFieldValue("storage", e.target.value);
                  }}
                >
                  {storages.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.errors.storage}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container className="mb-4">
            <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
              <Typography>Loại báo cáo</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <FormControl
                error={
                  formik.touched.storage && formik.errors.storage ? true : false
                }
                className="w-100"
              >
                <InputLabel>Loại báo cáo</InputLabel>
                <Select
                  fullWidth
                  label="Loại báo cáo"
                  {...formik.getFieldProps("type")}
                  value={formik.values.type}
                  onChange={(e) => {
                    formik.setFieldValue("type", e.target.value);
                  }}
                >
                  <MenuItem value="day">Báo cáo ngày</MenuItem>
                  <MenuItem value="week">Báo cáo tuần</MenuItem>
                  <MenuItem value="month">Báo cáo tháng</MenuItem>
                </Select>
                <FormHelperText>{formik.errors.storage}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container className="mb-4">
        <Grid item md={3} sm={3} className="align-items-center d-flex flex-row">
          <Typography>Ghi chú</Typography>
        </Grid>
        <Grid item md={9} sm={9}>
          <TextField
            label="Ghi chú"
            multiline
            rows={3}
            fullWidth
            {...formik.getFieldProps("note")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
