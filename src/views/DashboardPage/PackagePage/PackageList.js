import { FilterList, Info } from "@mui/icons-material";
import {
  Box,
  Button, Grid, Paper,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ReactTable from "react-table-v6";
import packageApi from "../../../api/packageApi";
import { CustomPagination } from "../../../components/CustomPagination";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable } from "../../../utils/queryUtils";


export const PackageList = () => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [_limit, setLimit] = useState(10);

  const history = useHistory();
  const location = useLocation();

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 100,
      },
      {
        Header: "Mã QR",
        accessor: "id",
        filterable: false,
        width: 250
      },
      {
        Header: "Kích thước",
        accessor: "size",
        filterable: false,
        width: 250
      },
      {
        Header: "Khối lượng",
        accessor: "weight",
        filterable: false,
      },
      {
        Header: "Số lượng",
        accessor: "quantity",
        filterable: false,
      },
      {
        Header: "Vị trí hiện tại",
        accessor: "current_address",
        filterable: false,
      },
      {
        Header: "Tuỳ chọn",
        accessor: "options",
        filterable: false,
      },
    ],
    [],
  );

  const handleData = (data) => {
    let data_table = data.map((prop, index) => {
      return {
        ...prop,
        stt: _start * _limit + index + 1,
        size: `${(prop?.size?.len || 0)} m x ${(prop?.size?.width || 0)} m x ${(prop?.size?.height || 0)} m`,
        quantity: prop.quantity + ' kiện',
        weight: prop.weight + ' kg',
        current_address: prop?.current_address?.city || "Đang xử lý",
        options: (
          <Button
            variant="contained"
            endIcon={<Info />}
            className="app-bg--primary"
            onClick={() => history.push("/package/detail", {
              package: prop
            })}
          >
            Chi tiết
          </Button>
        ),
      };
    });
    setData(data_table);
    setTotalPage(Math.ceil(data.length / _limit))
  };

  // useEffect(() => {
  //   if (location?.state?.packages) {
  //     setData(location.state.packages)
  //     handleData(location.state.packages);
  //   }
  // }, [location?.state?.packages]);


  const PackageQuery = useQueryTable("package-list", packageApi.getList, handleData, {
    order: location.state.order
  })

  return (
    <Box className="p-4">
      <Grid container className="p-4" direction="column">
        <Grid item md={12}>
          <Paper
            className="d-flex flex-row align-items-center p-4 rounded-top shadow-sm"
            sx={{
              bgcolor: "#F8F9FC",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography
              variant="h5"
              className="flex-grow-1 fs-5 app--primary"
            >
              Danh sách kiện hàng
            </Typography>
            <Box>
              <Button variant="outlined" endIcon={<FilterList />}>
                Lọc
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Paper
            className="p-4 shadow-sm"
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <ReactTable
              noDataText="Không có dữ liệu"
              data={data}
              columns={columns}
              previousText={"<"}
              nextText={">"}
              rowsText={"hàng"}
              ofText="/"
              LoadingComponent={LoadingTable}
              loading={PackageQuery.isLoading}
              // manual
              defaultPageSize={10}
              showPaginationBottom={true}
              sortable={false}
              resizable={false}
              PaginationComponent={CustomPagination}
              pages={totalPage}
              className="-striped -highlight"
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    console.log(rowInfo)
                    if (column.id !== "options") {
                      history.push("/package/detail", {
                        id: rowInfo.row.id
                      });
                    }
                  },
                };
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);
