const BinPacking3D = require("binpackingjs").BP3D;

const { Item, Bin, Packer } = BinPacking3D;

function validateFit(packages, container) {
  let packer = new Packer();
  let bin = new Bin(
    "Container",
    container.size.width,
    container.size.height,
    container.size.len,
    container.load,
  );
  let rawData = [];
  for (let item of packages) {
    rawData = [
      ...rawData,
      ...Array.from(
        { length: item.quantity },
        (_, index) =>
          new Item(
            item.id,
            item.size.width,
            item.size.height,
            item.size.len,
            item.weight,
          ),
      ),
    ];
  }
  packer.addBin(bin);
  rawData.forEach((item) => packer.addItem(item));
  packer.pack();

  let unfitQuantityResult = packer.unfitItems.reduce((total, item, index) => {
    if(typeof total[item.name] !== "undefined"){
      total[item.name]++; 
      return total;
    } else {
        total[item.name]=1; 
        return total;
    }
  }, {});

  return unfitQuantityResult
}

export { validateFit };
