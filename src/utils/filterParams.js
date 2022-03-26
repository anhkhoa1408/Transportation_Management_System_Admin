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
];

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
];

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
];

const vehicle = [
  {
    value: "Container",
    label: "Xe Container",
  },
  {
    value: "Truck",
    label: "Xe tải",
  },
];

const ratingPoint = [
  {
    value: "1",
    label: "1 sao",
  },
  {
    value: "2",
    label: "2 sao",
  },
  {
    value: "3",
    label: "3 sao",
  },
  {
    value: "4",
    label: "4 sao",
  },
  {
    value: "5",
    label: "5 sao",
  },
]

const saleType = [
  {
    value: "percentage",
    label: "Theo phần trăm",
  },
  {
    value: "value",
    label: "Theo giá trị",
  },
]

export { customerType, staffType, orderState, vehicle, ratingPoint, saleType };
