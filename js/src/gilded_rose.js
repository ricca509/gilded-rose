function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

Item.prototype.updateSellIn = function () {
  let updatedSellIn = this.sell_in - 1;

  const specialItem = getSpecialItem(this.name);

  if (specialItem && specialItem.updateSellIn) {
    updatedSellIn = specialItem.updateSellIn({
      name: this.name,
      sell_in: this.sell_in,
      quality: this.quality,
    });
  }

  this.sell_in = updatedSellIn;

  return this;
};

Item.prototype.updateQuality = function () {
  const updatedQuality = calculateUpdatedQuality({
    name: this.name,
    sell_in: this.sell_in,
    quality: this.quality,
  });

  this.quality = updatedQuality;

  return this;
};

const specialItems = {
  "Aged Brie": {
    updateQuality: ({ quality }) => {
      return quality < 50 ? increaseByOne(quality) : 50;
    },
  },
  "Sulfuras": {
    updateQuality: () => {
      return 80;
    },
    updateSellIn: ({ sell_in }) => {
      return sell_in;
    },
  },
  "Backstage passes": {
    updateQuality: ({ quality, sell_in }) => {
      if (sell_in < 0) {
        return 0;
      }
      let updatedQuality = increaseByOne(quality);

      if (sell_in <= 10) {
        updatedQuality = increaseByTwo(quality);
      }

      if (sell_in <= 5) {
        updatedQuality = increaseByThree(quality);
      }

      return updatedQuality <= 50 ? updatedQuality : 50;
    },
  },
  Conjured: {
    updateQuality: ({ quality, sell_in }) => {
      if (isPastSellDate(sell_in)) {
        return decreaseByFour(quality);
      }

      return quality > 0 ? decreaseByTwo(quality) : 0;
    },
  },
};

const getSpecialItem = (itemName) => {
  const specialItem = Object.entries(specialItems).find(([name]) =>
    itemName.startsWith(name)
  );

  return specialItem ? specialItem[1] : undefined;
};

const isPastSellDate = (sellDate) => sellDate < 0;

const add = (base) => (toNumber) => base + toNumber;
const sub = (base) => (fromNumber) => fromNumber - base;
const increaseByOne = add(1);
const increaseByTwo = add(2);
const increaseByThree = add(3);
const decreaseByOne = sub(1);
const decreaseByTwo = sub(2);
const decreaseByFour = sub(4);

const calculateUpdatedQuality = ({ name, sell_in, quality }) => {
  if (quality === 0) return quality;

  const specialItem = getSpecialItem(name);

  if (specialItem && specialItem.updateQuality) {
    return specialItem.updateQuality({ name, sell_in, quality });
  }

  if (isPastSellDate(sell_in)) {
    return decreaseByTwo(quality);
  }

  return quality > 0 ? decreaseByOne(quality) : 0;
};

const inn = (items = []) => {
  let itemsToSell = [...items];

  const updateItems = () => {
    itemsToSell.forEach((item) => {
      item.updateSellIn();
      item.updateQuality();
    });

    return [...itemsToSell];
  };

  return {
    updateItems,
  };
};

module.exports = {
  Item,
  inn,
};
