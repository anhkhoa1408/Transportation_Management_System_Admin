import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { joinAddress } from "../../../../utils/address";

function Detail({ detail, cars, assistances, ...props }) {
  let type =
    detail.from_storage && detail.to_storage
      ? "Liên tỉnh"
      : detail.from_storage && !detail.to_storage
      ? "Giao hàng"
      : "Thu gom hàng";

  let address =
    type === "Liên tỉnh"
      ? {
          from: detail.from_storage?.name || "",
          to: detail.to_storage?.name || "",
        }
      : "Giao hàng"
      ? {
          from: detail.from_storage?.name || "",
          to: joinAddress(detail.to_address),
        }
      : {
          from: joinAddress(detail.from_address),
          to: detail.to_storage?.name || "",
        };

  return (
    <Grid container direction="column">
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Ngày tạo"
          disabled
          fullWidth
          variant="outlined"
          value={moment(detail.createdAt).format("DD/MM/YYYY HH:mm")}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Ngày cập nhật"
          disabled
          fullWidth
          variant="outlined"
          value={moment(detail.updatedAt).format("DD/MM/YYYY HH:mm")}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Loại hình"
          disabled
          fullWidth
          variant="outlined"
          value={type}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Nơi đi"
          disabled
          fullWidth
          variant="outlined"
          value={address.from}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Nơi đến"
          disabled
          fullWidth
          variant="outlined"
          value={address.to}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Người vận chuyển"
          disabled
          fullWidth
          variant="outlined"
          value={props.carInfo?.manager?.name || ""}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <FormControl fullWidth>
          <InputLabel>Xe vận chuyển</InputLabel>
          <Select
            fullWidth
            label="Xe vận chuyển"
            value={props.car}
            onChange={(e) => {
              let carInfo = cars.find((item) => item.id === e.target.value);
              props.setCar(e.target.value);
              props.setCarInfo(carInfo);
            }}
          >
            {cars.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {`${item.licence}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <TextField
          label="Tải trọng"
          disabled
          fullWidth
          variant="outlined"
          value={props.carInfo?.load}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item sm={12} md={12} className="p-2">
        <FormControl fullWidth>
          <InputLabel>Người hỗ trợ</InputLabel>
          <Select
            fullWidth
            label="Người hỗ trợ"
            value={props.assistance}
            onChange={(e) => props.setAssistance(e.target.value)}
          >
            {assistances.staffs &&
              assistances.staffs.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Detail;
