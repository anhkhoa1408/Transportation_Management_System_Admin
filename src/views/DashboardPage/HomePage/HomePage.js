import {
  Box,
  Container,
  Grid,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Paid,
  CalendarToday,
  Archive,
  ImportExport,
  Chat,
} from "@mui/icons-material";
import Chart from "react-apexcharts";
import { useHistory } from "react-router-dom";

export const HomePage = (props) => {
  const history = useHistory();
  const actions = [
    {
      icon: <ImportExport color="primary" />,
      name: "Nhập xuất",
      link: "/dashboard",
    },
    { icon: <Archive color="primary" />, name: "Đơn hàng", link: "/order" },
    { icon: <Chat color="primary" />, name: "Phản hồi", link: "/feedback" },
  ];
  const [option, setOption] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });
  return (
    <Box className="d-flex flex-column w-100 p-4">
      <Container maxWidth="xl" className="mb-5">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={12} lg={3}>
            <Paper className="px-3 py-4 d-flex flex-row align-items-center border-start border-success border-5">
              <Box component="div" className="flex-grow-1">
                <Typography
                  variant="h5"
                  className="text-success fs-6 fw-bold mb-2"
                >
                  Thu nhập hằng quý
                </Typography>
                <Typography variant="h5" className="fs-4 fw-bold opacity-75">
                  $40,000
                </Typography>
              </Box>
              <Paid sx={{ fontSize: 33, opacity: 0.3 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sm={12} lg={3}>
            <Paper className="px-3 py-4 d-flex flex-row align-items-center border-start border-warning border-5">
              <Box component="div" className="flex-grow-1">
                <Typography
                  variant="h5"
                  className="text-warning fs-6 fw-bold mb-2"
                >
                  Thu nhập hằng năm
                </Typography>
                <Typography variant="h5" className="fs-4 fw-bold opacity-75">
                  $1,000,000
                </Typography>
              </Box>
              <CalendarToday sx={{ fontSize: 33, opacity: 0.3 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sm={12} lg={3}>
            <Paper className="px-3 py-4 d-flex flex-row align-items-center border-start border-primary border-5">
              <Box component="div" className="flex-grow-1">
                <Typography
                  variant="h5"
                  className="text-primary fs-6 fw-bold mb-2"
                >
                  Đơn hàng hiện tại
                </Typography>
                <Typography variant="h5" className="fs-4 fw-bold opacity-75">
                  30
                </Typography>
              </Box>
              <Archive sx={{ fontSize: 33, opacity: 0.3 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sm={12} lg={3}>
            <Paper className="px-3 py-4 d-flex flex-row align-items-center border-start border-danger border-5">
              <Box component="div" className="flex-grow-1">
                <Typography
                  variant="h5"
                  className="text-danger fs-6 fw-bold mb-2"
                >
                  Đơn hàng còn lại
                </Typography>
                <Typography variant="h5" className="fs-4 fw-bold opacity-75">
                  12
                </Typography>
              </Box>
              <Archive sx={{ fontSize: 33, opacity: 0.3 }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid container>
          <Grid item sm={12} md={12} lg={12}>
            <Paper
              className="p-4"
              sx={{
                background: "#F8F9FA",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Typography variant="h5" className="fs-5 app-primary-color">
                Lượt vận chuyển tháng
              </Typography>
            </Paper>
            <Paper
              className="p-4"
              sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              <Chart
                options={option}
                series={[
                  {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91],
                  },
                ]}
                type="bar"
                height={350}
                width="100%"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 40, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => history.push(action.link)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
