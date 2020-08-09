function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const inn = (items = []) => {
  let itemsToSell = [...items];

  const isPastSellDate = (sellDate) => sellDate <= 0;

  const calculateUpdatedQuality = ({ name, sell_in, quality }) => {
    if (quality === 0) return quality;

    if (isPastSellDate(sell_in)) {
      return (quality - 2);
    }

    return quality > 0 ? (quality - 1) : 0;
  };

  const updateQuality = () => {
    const newItems = itemsToSell.map(({ name, sell_in, quality }) => {
      const updatedSellIn = sell_in > 0 ? (sell_in - 1) : sell_in;
      const updatedQuality = calculateUpdatedQuality({ name, sell_in, quality });

      return {
        name,
        sell_in: updatedSellIn,
        quality: updatedQuality,
      };
    });

    itemsToSell = [...newItems];

    return [...itemsToSell];
  };

  return {
    updateQuality,
  };
};

module.exports = {
  Item,
  inn,
};
