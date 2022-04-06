import * as xlsx from "xlsx-js-style";

function exportExcel(data) {
  // Initial header data
  const title = [data.title.toUpperCase()];
  const start = ["Từ ngày: " + data.startTime];
  const end = ["Đến ngày: " + data.endTime];
  const workSheetColumnName = [
    "Số thứ tự",
    "Mã kiện hàng",
    "Khối lượng mỗi kiện",
    "Chiều dài",
    "Chiều rộng",
    "Chiều cao",
    "Số lượng nhập",
    "Số lượng xuất",
    "Số lượng tồn",
    "Đơn vị tính",
  ];

  // Initial data
  const workbook = xlsx.utils.book_new();
  const workSheetData = [
    title,
    start,
    end,
    [],
    ["Danh mục hàng hóa"],
    workSheetColumnName,
    ...data.data.map((item, index) => [
      index + 1,
      item.id,
      item.weight + " kg",
      item.size.len + " cm",
      item.size.width + " cm",
      item.size.height + " cm",
      item.imported,
      item.exported,
      item.remain,
      "kiện",
    ]),
  ];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workbook, workSheet, "Nhập xuất");

  // Initial column width
  let wscols = [
    { wch: 12 },
    { wch: 40 },
    { wch: 24 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
  ];
  workSheet["!cols"] = wscols;

  // Style column and row
  let sheet = workbook.Sheets[workbook.SheetNames[0]];
  let range = xlsx.utils.decode_range(sheet["!ref"]);
  for (var R = range.s.r; R <= range.e.r; ++R) {
    for (var C = range.s.c; C <= range.e.c; ++C) {
      var cellref = xlsx.utils.encode_cell({ c: C, r: R });
      if (!sheet[cellref]) continue;
      var cell = sheet[cellref];

      let fontStyle = {},
        borderStyle = {},
        fillStyle = {};
      if (["A1"].includes(cellref)) {
        fontStyle = {
          sz: 18,
        };
      } else if (
        ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "J6"].includes(
          cellref,
        )
      ) {
        fillStyle = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "B0FC9D" },
          },
        };
        borderStyle = {
          top: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
          left: { style: "thin", color: { auto: 1 } },
        };
      } else if (!["A1", "A2", "A3", "A5"].includes(cellref)) {
        borderStyle = {
          top: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
          left: { style: "thin", color: { auto: 1 } },
        };
      } else if (["A2", "A3"].includes(cellref)) {
        fontStyle = {
          italic: true,
        };
      } else if (cellref === "A5") {
        fontStyle = {
          sz: 18,
        };
      }

      cell.s = {
        alignment: {
          vertical: "center",
          horizontal: "left",
        },
        font: {
          name: "Times New Roman",
          sz: 13,
          color: { rgb: "000000" },
          italic: false,
          underline: false,
          ...fontStyle,
        },
        ...fillStyle,
        border: {
          ...borderStyle,
        },
      };
    }
  }

  xlsx.writeFile(workbook, `Báo cáo ${data.name}.xlsx`);
}

function exportCSV(data) {}

export { exportCSV, exportExcel };
