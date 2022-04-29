function handleUserRole(role) {
  switch (role) {
    case "Admin":
      return "Người quản trị";
    case "Stocker":
      return "Thủ kho";
    case "Driver":
      return "Người vận chuyển";
    case "Assistance":
      return "Người hỗ trợ";
    case "User":
      return "Khách hàng thông thường";
    case "Iron":
      return "Thành viên bạc";
    case "Gold":
      return "Thành viên vàng";
    case "Diamond":
      return "Thành viên kim cương";
    case "Platinum":
      return "Thành viên bạch kim";
    case "All":
      return "Tất cả khách hàng";
    default:
      return "Tất cả";
  }
}

export { handleUserRole };
