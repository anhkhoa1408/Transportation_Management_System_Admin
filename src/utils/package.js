function convertPackageType(typ) {
  switch (typ) {
    case "explosive":
      return "Dễ cháy nổ";
    case "fragile":
      return "Dễ vỡ";
    case "smell":
      return "Có mùi";
    case "normal":
      return "Thông thường";
    default:
      return "Thông thường";
  }
}

var packages = [
  {
    label: "Dễ cháy nổ",
    value: "explosive",
  },
  {
    label: "Dễ vỡ",
    value: "fragile",
  },
  {
    label: "Có mùi",
    value: "smell",
  },
  {
    label: "Thông thường",
    value: "normal",
  },
];

export { convertPackageType, packages };
