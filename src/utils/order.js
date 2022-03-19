function convertOrderState(state) {
  switch (state) {
    case 0:
      return 'Đang xử lý';
    case 1:
      return 'Chuẩn bị kiện hàng';
    case 2:
      return 'Đang vận chuyển';
    case 3:
      return 'Chuẩn bị giao hàng';
    case 4:
      return 'Đã giao hàng';
    case 5:
      return 'Đã huỷ';
    default:
      return ""
  }
}

function convertTracingState(state) {
  switch (state) {
    case 0:
      return 'Đang nhập kho';
    case 1:
      return 'Nhập kho thành công';
    case 2:
      return 'Đang xuất kho';
    case 3:
      return 'Xuất kho thành công';
    case 4:
      return 'Đang vận chuyển';
    default:
      return "";
  }
}

function formatCash(cash) {
  return cash
    .split('')
    .reverse()
    .reduce((total, item, index) =>
      !(index % 3) ? `${item},${total}` : `${item}${total}`,
    )
    .concat(' VND');
}

export { convertOrderState, convertTracingState, formatCash };
