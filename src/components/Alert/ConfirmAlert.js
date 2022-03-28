import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "@mui/material";

function ContentAlert(props) {
  return (
    <>
      <SweetAlert
        onConfirm={props.onConfirm}
        closeOnClickOutside={true}
        onCancel={props.onClose}
        warning
        title={<div className="fs-5 fw-normal">{props.title}</div>}
        showConfirm={false}
        showCancel={false}
        openAnim={{ name: "showSweetAlert", duration: 300 }}
        closeAnim={{ name: "hideSweetAlert", duration: 300 }}
      >
        <div className="text-center pt-2">
          {props.content}
          <Button
            variant="outlined"
            onClick={props.onConfirm}
            color={props.color ? props.color : "success"}
            className={`mx-1 mt-3 btn-pill`}
          >
            <span className={`font-weight-bold`}>
              {props.confirmBtnText ? props.confirmBtnText : "Xác nhận"}
            </span>
          </Button>
          {props.hideCancel ? null : (
            <Button
              variant="outlined"
              onClick={props.onClose}
              color={props.colorCancel ? props.colorCancel : "error"}
              className="mx-1 mt-3"
            >
              <span>
                {props.cancelBtnText ? props.cancelBtnText : "Huỷ bỏ"}
              </span>
            </Button>
          )}
        </div>
      </SweetAlert>
    </>
  );
}

export default ContentAlert;
