import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Bonk from "yup";
import voucherApi from "../../../api/voucherApi";
import ConfirmAlert from "../../../components/Alert/ConfirmAlert";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../hooks/useScroll";
import Detail from "./Detail/Detail";

const VoucherDetail = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [alert, setAlert] = useState(null);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    customer_type: "All",
    sale: 0,
    sale_max: 0,
    sale_type: "percentage",
    minimum_order: 0,
    voucher_img: {
      url: "",
    },
    expired: new Date(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required("Thông tin bắt buộc"),
      description: Bonk.string().required("Thông tin bắt buộc"),
      customer_type: Bonk.string().required("Thông tin bắt buộc"),
      sale_type: Bonk.string().required("Thông tin bắt buộc"),
      sale: Bonk.number()
        .required("Thông tin bắt buộc")
        .test("sale-test", "Giá trị không hợp lệ", (value, ctx) => {
          if (ctx.parent.sale_type === "percentage") {
            return value > 100 || value <= 1 ? false : true;
          } else {
            return value < 10000 ? false : true;
          }
        }),
      sale_max: Bonk.number()
        .min(1000, "Giá trị không hợp lệ")
        .required("Thông tin bắt buộc"),
      minimum_order: Bonk.number()
        .min(1000, "Giá trị không hợp lệ")
        .required("Thông tin bắt buộc"),
    }),
    onSubmit: (values) => {
      if (location?.state?.id) {
        handleUpdate(values);
      } else if (location?.state?.create) {
        handleCreate(values);
      }
    },
  });

  const handleUpdate = (values) => {
    if (image && image.path) {
      voucherApi
        .updateImage(location.state.id, image)
        .then((response) => {
          setImage(process.env.MAIN_URL + response.url);
          successNotify("Cập nhật ảnh thành công");
        })
        .catch((error) => {
          errorNotify("Cập nhật ảnh thất bại");
        });
    } else if (!image) {
      errorNotify("Chưa thêm hình ảnh khuyến mãi");
      return;
    }
    voucherApi
      .update(location.state.id, values)
      .then((response) => {
        successNotify("Cập nhật thành công");
        setData({
          ...data,
          ...response,
        });
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleCreate = (values) => {
    if (image && image.path) {
      voucherApi
        .updateImage(location.state.id, image)
        .then((response) => {
          setImage(process.env.MAIN_URL + response.url);
          successNotify("Cập nhật ảnh thành công");
          history.push("/voucher");
        })
        .catch((error) => {
          errorNotify("Cập nhật ảnh thất bại");
        });
    } else if (!image) {
      errorNotify("Chưa thêm hình ảnh khuyến mãi");
    }
    let {
      name,
      description,
      sale,
      sale_max,
      sale_type,
      minimum_order,
      customer_type,
      expired,
    } = values;
    voucherApi
      .create({
        name,
        description,
        sale,
        sale_max,
        sale_type,
        minimum_order,
        customer_type,
        expired,
      })
      .then((response) => {
        successNotify("Cập nhật thành công");
      })
      .catch((error) => {
        errorNotify("Cập nhật thất bại");
      });
  };

  const handleDelete = () => {
    if (location?.state?.id) {
      setAlert(null);
      voucherApi
        .delete(location.state.id)
        .then((response) => {
          history.push("/voucher");
          successNotify("Xóa thành công");
        })
        .catch((error) => {
          errorNotify("Xóa thất bại");
        });
    }
  };

  const handleConfirm = () => {
    setAlert(
      <ConfirmAlert
        onClose={() => setAlert(null)}
        onConfirm={handleDelete}
        confirmBtnText={"Chấp nhận"}
        cancelBtnText={"Hủy bỏ"}
        title="Bạn có thật sự muốn xóa mã giảm giá này không ?"
      />,
    );
  };

  useEffect(() => {
    if (location?.state?.id) {
      voucherApi
        .getDetail(location.state.id)
        .then((response) => {
          setData(response);
          console.log(response);
          if (response.voucher_img) {
            let isValidUrl = new RegExp("https://").test(response.voucher_img.url);
            setImage(isValidUrl
              ? response.voucher_img.url
              : process.env.MAIN_URL + response.voucher_img.url,);
          }
        })
        .catch((error) => {
          errorNotify("Có lỗi xảy ra");
        });
    }
  }, []);

  useScroll("detail-header");

  return (
    <Grid container className="p-4">
      {alert}
      <Grid
        item
        md={12}
        className="pt-4 px-4 position-sticky d-flex flex-column header-sticky"
      >
        <Paper
          id="detail-header"
          className="d-flex flex-column px-4 rounded-top col-md-11 align-self-center shadow-none"
        >
          <Box className="px-4 py-2">
            <Grid container className="my-3">
              <Grid item md={8}>
                <Typography variant="h6">
                  Chi tiết mã giảm giá
                </Typography>
              </Grid>
              <Grid item md={4} className="d-flex flex-row justify-content-end">
                {location?.state?.id && (
                  <Button
                    onClick={handleConfirm}
                    variant="outlined"
                    className="me-2 app-btn app-btn--danger"
                  >
                    Xóa
                  </Button>
                )}
                <Button
                  variant="outlined"
                  className="app-btn app-btn--success"
                  onClick={formik.submitForm}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid item md={12} className="px-4 d-flex flex-column">
        <Paper className="d-flex flex-column px-4 pt-1 rounded-top col-md-11 align-self-center shadow-none">
          <Box className="px-4">
            <Detail formik={formik} />
          </Box>
          <Box className="d-flex flex-column px-4 py-3">
            <Typography>Hình ảnh mã giảm giá</Typography>
            <Box className="align-self-start mt-3">
              <ImageUpload image={image} setImage={setImage} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VoucherDetail;
