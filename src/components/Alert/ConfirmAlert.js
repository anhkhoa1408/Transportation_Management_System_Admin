import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";

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
        openAnim={{ name: 'showSweetAlert', duration: 500 }}
        closeAnim={{ name: 'hideSweetAlert', duration: 300 }}
      >
        <div className="text-center pt-2">
          {props.content}
          <Button
            onClick={props.onConfirm}
            color={props.color ? props.color : "success"}
            className={`mx-1 mt-3 btn-pill`}
          >
            <span
              className={`font-weight-bold`}
            >
              {props.confirmBtnText ? props.confirmBtnText : 'Xác nhận'}
            </span>
          </Button>
          {props.hideCancel ? null : (
            <Button
              onClick={props.onClose}
              color={props.colorCancel ? props.colorCancel : "danger"}
              className="mx-1 mt-3 btn-danger"
            >
              <span>
                {props.cancelBtnText ? props.cancelBtnText : props.t("cancle")}
              </span>
            </Button>
          )}
        </div>
      </SweetAlert>
    </>
  );
}

export default ContentAlert;
