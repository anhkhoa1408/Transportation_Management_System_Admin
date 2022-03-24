const customerType = [
  {
    value: "Iron",
    label: "Thành viên bạc",
  },
  {
    value: "Gold",
    label: "Thành viên vàng",
  },
  {
    value: "Diamond",
    label: "VIP",
  },
]

const staffType = [
  {
    value: "Stocker",
    label: "Thủ kho",
  },
  {
    value: "Driver",
    label: "Người vận chuyển",
  },
  {
    value: "Assistance",
    label: "Người hỗ trợ",
  },
]

const orderState = [
  {
    value: "0",
    label: "Đang xử lý",
  },
  {
    value: "1",
    label: "Chuẩn bị kiện hàng",
  },
  {
    value: "2",
    label: "Đang vận chuyển",
  },
  {
    value: "3",
    label: "Chuẩn bị giao hàng",
  },
  {
    value: "4",
    label: "Đã giao hàng",
  },
  {
    value: "5",
    label: "Đã huỷ",
  },
  
]


export {
  customerType,
  staffType,
  orderState
}