import React from "react";
import DateAdapter from '@mui/lab/AdapterDayjs';

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

function TimePicker({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default TimePicker;
