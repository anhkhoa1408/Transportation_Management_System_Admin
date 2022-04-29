import { Close, FilterList, RestartAlt, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

function Filter({ name, value, onChangeName, onChangeValue, listParam = [] }) {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const handleChange = (e, type) => {
    if (type === "name") {
      onChangeName(e.target.value);
      onChangeValue("");
    } else if (type === "value") {
      onChangeValue(e.target.value);
    }
  };

  const handleReset = () => {
    onChangeName(listParam[0].value);
    onChangeValue("");
  };

  const handleFind = () => {
    const valueInput = document.querySelector("#inputField")?.value;
    if (valueInput) onChangeValue(valueInput);
  };

  return (
    <Dropdown isOpen={toggle} toggle={() => null}>
      <DropdownToggle className="btn-outline shadow-none border-0 invisible w-0 h-0 me-2" />
      <Button
        variant="outlined"
        endIcon={<FilterList />}
        onClick={() => setToggle(!toggle)}
      >
        Lọc
      </Button>
      <DropdownMenu
        style={{
          minWidth: 500,
        }}
        className="px-2 py-4 shadow rounded-1"
      >
        <Box className="w-100 d-flex flex-row mb-3">
          <Box className="w-50 mx-2">
            <FormControl className="w-100">
              <InputLabel>Lọc theo</InputLabel>
              <Select
                value={name}
                label="Lọc theo"
                onChange={(e) => handleChange(e, "name")}
              >
                {listParam.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-50 mx-2">
            <FormControl className="w-100">
              {listParam.find((item) => item.value === name).type ===
              "input" ? (
                <TextField
                  id="inputField"
                  label="Từ khóa"
                  ref={ref}
                ></TextField>
              ) : (
                <>
                  <InputLabel>Từ khóa</InputLabel>

                  <Select
                    value={value}
                    label="Từ khóa"
                    onChange={(e) => handleChange(e, "value")}
                  >
                    {listParam
                      .find((item) => item.value === name)
                      .params.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            </FormControl>
          </Box>
        </Box>
        <Box className="mx-2 d-flex flex-column">
          <Box className="w-100 mb-3">
            <Button
              onClick={handleFind}
              className="w-100 app-bg--primary"
              variant="contained"
              endIcon={<Search />}
            >
              Tìm kiếm
            </Button>
          </Box>

          <Box className="d-flex flex-row">
            <Box className="w-50">
              <Button
                onClick={handleReset}
                className="w-100 app--primary"
                endIcon={<RestartAlt />}
              >
                Đặt lại
              </Button>
            </Box>
            <Box className="w-50">
              <Button
                onClick={() => setToggle(false)}
                className="w-100"
                color="error"
                endIcon={<Close />}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Box>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Filter;
