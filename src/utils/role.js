function handleUserRole(role) {
  switch (role) {
    case "Admin":
      return "Người quản trị";
    case "Stocker":
      return "Thủ kho";
    case "Driver":
      return "Người vận chuyển";
    case "Assistance":
      return "Người hỗ trợ"
    case "Iron":
      return "Thành viên bạc"
    case "Gold":
      return "Thành viên vàng"
    case "Diamond":
      return "Thành viên VIP"
    default:
      return ""
  }
}

export {
  handleUserRole
}
