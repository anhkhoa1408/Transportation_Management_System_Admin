import { Chip, Grid, Paper } from "@mui/material";
import moment from 'moment';
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactTable from "react-table-v6";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import userApi from "../../../api/userApi";
import { CustomPagination } from "../../../components/CustomPagination";
import LoadingTable from "../../../components/LoadingTable";
import { useQueryTable, useUpdateTable } from "./../../../utils/queryUtils.js";


function FurloughList() {
  const [data, setData] = useState([])
  const [_start, setStart] = useState(0);
  const [totalPage, setTotal] = useState(0);
  const [_limit, setLimit] = useState(10);

  const location = useLocation()

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
        filterable: false,
        width: 100,
      },
      {
        Header: "Thời gian bắt đầu",
        accessor: "start_time",
        filterable: false,
      },
      {
        Header: "Thời gian kết thúc",
        accessor: "end_time",
        filterable: false,
      },
      {
        Header: "Lý do",
        accessor: "reason",
        filterable: false,
      },
      {
        Header: "Trạng thái",
        accessor: "state",
        filterable: false,
      },
      {
        Header: "Hành động",
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
        start_time: moment(prop.start_time).format("DD/MM/YYYY"),
        end_time: moment(prop.end_time).format("DD/MM/YYYY"),
        state: handleState(prop.state),
        options: (
          <UncontrolledDropdown direction="left">
            <DropdownToggle className="app-primary-bg-color border-0 shadow-sm">Tùy chọn</DropdownToggle>
            <DropdownMenu >
              <DropdownItem onClick={() => handleAction(prop.id, "accepted")}>Chấp nhận</DropdownItem>
              <DropdownItem onClick={() => handleAction(prop.id, "canceled")} className="text-danger">Không cho phép</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

        ),
      };
    });
    setData(data_table);
    setTotal(data.totalPage);
  };

  const FurloughQuery = useQueryTable(
    "furlough-list",
    userApi.getFurloughs,
    handleData,
    {
      _start,
      _limit,
      driver: location?.state?.id
    },
  );

  const FurloughUpdate = useUpdateTable("furlough-list", userApi.updateFurlough)

  const handleAction = (id, type) => {
    FurloughUpdate.mutate({
      id: id,
      body: {
        state: type
      }
    })
  }

  const handleState = (state) => {
    switch (state) {
      case "pending":
        return <Chip variant="outlined" label="Chờ xử lý" color="warning" />;
      case "accepted":
        return (
          <Chip variant="outlined" label="Chấp nhận" color="success" />
        );
      case "canceled":
        return <Chip variant="outlined" label="Không cho phép" color="error" />;
      default:
        return <Chip variant="outlined" label="Đang xử lý" color="warning" />;
    }
  };

  return (
    <Grid container direction="column">
      <Grid item md={12} xs={12}>
        <Paper
          className="pb-4 shadow-none"
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
            manual
            loading={FurloughQuery.isLoading}
            LoadingComponent={LoadingTable}
            defaultPageSize={_limit}
            showPaginationBottom={true}
            sortable={false}
            resizable={false}
            PaginationComponent={CustomPagination}
            pages={totalPage}
            onFetchData={async (state, instance) => {
              setStart(state.page);
              setLimit(state.pageSize);
            }}
            className="-striped -highlight"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FurloughList;
