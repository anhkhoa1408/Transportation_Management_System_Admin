function convertReportType(type) {
  switch (type) {
    case "day":
      return 'Báo cáo ngày';
    case "week":
      return 'Báo cáo tuần';
    case "month":
      return 'Báo cáo tháng';
    default:
      return ""
  }
}

export {
  convertReportType
}