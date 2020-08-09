function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

Item.prototype.updateSellIn = function () {
  let updatedSellIn = this.sell_in - 1;

  if (specialItems[this.name] && specialItems[this.name].updateSellIn) {
    updatedSellIn = specialItems[this.name].updateSellIn({
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
  "Sulfuras, Hand of Ragnaros": {
    updateQuality: () => {
      return 80;
    },
    updateSellIn: ({ sell_in }) => {
      return sell_in;
    },
  },
  "Backstage passes to a TAFKAL80ETC concert": {
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
};

const isPastSellDate = (sellDate) => sellDate < 0;

const add = (base) => (toNumber) => base + toNumber;
const sub = (base) => (fromNumber) => fromNumber - base;
const increaseByOne = add(1);
const increaseByTwo = add(2);
const increaseByThree = add(3);
const decreaseByOne = sub(1);
const decreaseByTwo = sub(2);

const calculateUpdatedQuality = ({ name, sell_in, quality }) => {
  if (quality === 0) return quality;

  if (specialItems[name] && specialItems[name].updateQuality) {
    return specialItems[name].updateQuality({ name, sell_in, quality });
  }

  if (isPastSellDate(sell_in)) {
    return decreaseByTwo(quality);
  }

  return quality > 0 ? decreaseByOne(quality) : 0;
};

const inn = (items = []) => {
  let itemsToSell = [...items];

  const updateItem = () => {
    const newItems = itemsToSell.map((item) => {
      item.updateSellIn();
      item.updateQuality();

      return item;
    });

    itemsToSell = [...newItems];

    return [...itemsToSell];
  };

  return {
    updateItem,
  };
};

module.exports = {
  Item,
  inn,
};
