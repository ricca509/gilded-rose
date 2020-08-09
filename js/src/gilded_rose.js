function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const inn = (items = []) => {
  const updateQuality = () => {
    return items;
  };

  return {
    updateQuality,
  };
};

module.exports = {
  Item,
  inn,
};
