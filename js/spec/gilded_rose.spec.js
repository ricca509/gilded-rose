const { inn, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("Item update", () => {
    it("should decrease the number of days we have to sell the item by 1", () => {
      const gildedRose = inn([new Item("Item", 10, 20)]);

      expect(gildedRose.updateItems()[0].sell_in).toEqual(9);
      expect(gildedRose.updateItems()[0].sell_in).toEqual(8);
      expect(gildedRose.updateItems()[0].sell_in).toEqual(7);
    });

    it("should degrade Quality by 1", () => {
      const gildedRose = inn([new Item("Item", 5, 20)]);

      expect(gildedRose.updateItems()[0].quality).toEqual(19);
      expect(gildedRose.updateItems()[0].quality).toEqual(18);
      expect(gildedRose.updateItems()[0].quality).toEqual(17);
    });

    it("should degrade Quality twice as fast once the sell by date has passed", () => {
      const gildedRose = inn([new Item("Item", 1, 20)]);

      expect(gildedRose.updateItems()[0].quality).toEqual(19);
      expect(gildedRose.updateItems()[0].quality).toEqual(17);
      expect(gildedRose.updateItems()[0].quality).toEqual(15);
    });

    it("should never allow negative Quality", () => {
      let gildedRose = inn([new Item("Item", 5, 1)]);

      expect(gildedRose.updateItems()[0].quality).toEqual(0);
      expect(gildedRose.updateItems()[0].quality).toEqual(0);

      gildedRose = inn([new Item("Item", 5, -1)]);
      expect(gildedRose.updateItems()[0].quality).toEqual(0);
    });

    describe("For special items", () => {
      describe("Aged Brie", () => {
        it("should increase in Quality (+1) the older it gets", () => {
          const gildedRose = inn([new Item("Aged Brie", 5, 2)]);

          expect(gildedRose.updateItems()[0].quality).toEqual(3);
          expect(gildedRose.updateItems()[0].quality).toEqual(4);
          expect(gildedRose.updateItems()[0].quality).toEqual(5);
        });

        it("should never have Quality higher than 50", () => {
          const gildedRose = inn([new Item("Aged Brie", 5, 49)]);

          expect(gildedRose.updateItems()[0].quality).toEqual(50);
          expect(gildedRose.updateItems()[0].quality).toEqual(50);
        });
      });

      describe("Sulfuras", () => {
        it("should always have a Quality of 80", () => {
          const gildedRose = inn([
            new Item("Sulfuras, Hand of Ragnaros", 5, 10),
          ]);
          expect(gildedRose.updateItems()[0].quality).toEqual(80);
        });

        it("should never decrease in Quality", () => {
          const gildedRose = inn([
            new Item("Sulfuras, Hand of Ragnaros", 5, 80),
          ]);
          expect(gildedRose.updateItems()[0].quality).toEqual(80);
          expect(gildedRose.updateItems()[0].quality).toEqual(80);
        });

        it("should never have to be sold", () => {
          const gildedRose = inn([
            new Item("Sulfuras, Hand of Ragnaros", 5, 80),
          ]);
          expect(gildedRose.updateItems()[0].sell_in).toEqual(5);
          expect(gildedRose.updateItems()[0].sell_in).toEqual(5);
        });
      });

      describe("Backstage passes", () => {
        it("should increase in Quality by 2 when there are 10 days or less to the concert", () => {
          const gildedRose = inn([
            new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2),
          ]);

          expect(gildedRose.updateItems()[0].quality).toEqual(4);
          expect(gildedRose.updateItems()[0].quality).toEqual(6);
          expect(gildedRose.updateItems()[0].quality).toEqual(8);
          expect(gildedRose.updateItems()[0].quality).toEqual(10);
          expect(gildedRose.updateItems()[0].quality).toEqual(12);
        });

        it("should increase in Quality by 3 when there are 5 days or less to the concert", () => {
          const gildedRose = inn([
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2),
          ]);

          expect(gildedRose.updateItems()[0].quality).toEqual(5);
          expect(gildedRose.updateItems()[0].quality).toEqual(8);
          expect(gildedRose.updateItems()[0].quality).toEqual(11);
          expect(gildedRose.updateItems()[0].quality).toEqual(14);
          expect(gildedRose.updateItems()[0].quality).toEqual(17);
        });

        it("should drop Quality to 0 after the concert", () => {
          const gildedRose = inn([
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
          ]);

          expect(gildedRose.updateItems()[0].quality).toEqual(0);
        });

        it("should never have Quality higher than 50", () => {
          const gildedRose = inn([
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
          ]);

          expect(gildedRose.updateItems()[0].quality).toEqual(50);
          expect(gildedRose.updateItems()[0].quality).toEqual(50);
        });
      });

      describe("Conjured items", () => {
        it("should degrade in Quality twice as fast as normal items", () => {
          let gildedRose = inn([new Item("Conjured Mana Cake", 5, 20)]);

          expect(gildedRose.updateItems()[0].quality).toEqual(18);
          expect(gildedRose.updateItems()[0].quality).toEqual(16);
          expect(gildedRose.updateItems()[0].quality).toEqual(14);

          gildedRose = inn([new Item("Conjured Mana Cake", 0, 20)]);

          expect(gildedRose.updateItems()[0].quality).toEqual(16);
          expect(gildedRose.updateItems()[0].quality).toEqual(12);
        });
      });
    });
  });
});
