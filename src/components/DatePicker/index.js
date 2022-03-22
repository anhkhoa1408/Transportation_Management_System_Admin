import React from "react";
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

function TimePicker({ value, setValue, ...props }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField className="w-100" {...params} />}
        {...props}
        
      />
    </LocalizationProvider>
  );
}

export default TimePicker;
