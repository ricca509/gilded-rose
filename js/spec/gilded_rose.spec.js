const { inn, Item } = require('../src/gilded_rose');

describe("Gilded Rose", function () {
  describe("updateQuality", () => {
    it('should decrease the number of days we have to sell the item by 1', () => {
      const gildedRose = inn([new Item("Item", 10, 20)]);

      expect(gildedRose.updateQuality()[0].sell_in).toEqual(9);
      expect(gildedRose.updateQuality()[0].sell_in).toEqual(8);
      expect(gildedRose.updateQuality()[0].sell_in).toEqual(7);
    });

    it("should degrade every day by 1", () => {
      const gildedRose = inn([new Item("Item", 5, 20)]);

      expect(gildedRose.updateQuality()[0].quality).toEqual(19);
      expect(gildedRose.updateQuality()[0].quality).toEqual(18);
      expect(gildedRose.updateQuality()[0].quality).toEqual(17);
    });

    it("should degrade twice as fast once the sell by date has passed", () => {
      const gildedRose = inn([new Item("Item", 1, 20)]);

      expect(gildedRose.updateQuality()[0].quality).toEqual(19);
      expect(gildedRose.updateQuality()[0].quality).toEqual(17);
      expect(gildedRose.updateQuality()[0].quality).toEqual(15);
    });

    it("should never be negative", () => {
      let gildedRose = inn([new Item("Item", 5, 1)]);

      expect(gildedRose.updateQuality()[0].quality).toEqual(0);
      expect(gildedRose.updateQuality()[0].quality).toEqual(0);
      
      gildedRose = inn([new Item("Item", 5, -1)]);
      expect(gildedRose.updateQuality()[0].quality).toEqual(0);
    });

    describe("Aged Brie", () => {
      it("should increase in Quality (+1) the older it gets", () => {
        const gildedRose = inn([new Item("Aged Brie", 5, 2)]);

        expect(gildedRose.updateQuality()[0].quality).toEqual(3);
        expect(gildedRose.updateQuality()[0].quality).toEqual(4);
        expect(gildedRose.updateQuality()[0].quality).toEqual(5);
      });

      it("should never be more than 50", () => {
        const gildedRose = inn([new Item("Aged Brie", 5, 49)]);

        expect(gildedRose.updateQuality()[0].quality).toEqual(50);
        expect(gildedRose.updateQuality()[0].quality).toEqual(50);
      });
    });

    describe("Sulfuras, Hand of Ragnaros", () => {
      it("should always have a quality of 80", () => {
        const gildedRose = inn([new Item("Sulfuras, Hand of Ragnaros", 5, 10)]);
        expect(gildedRose.updateQuality()[0].quality).toEqual(80);
      });

      it("should never decrease in Quality", () => {
        const gildedRose = inn([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
        expect(gildedRose.updateQuality()[0].quality).toEqual(80);
        expect(gildedRose.updateQuality()[0].quality).toEqual(80);
      });

      it("should never have to be sold", () => {
        const gildedRose = inn([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
        expect(gildedRose.updateQuality()[0].sell_in).toEqual(5);
        expect(gildedRose.updateQuality()[0].sell_in).toEqual(5);
      });
    });

    describe("Backstage passes to a TAFKAL80ETC concert", () => {
      describe("increase in Quality the older they get", () => {
        it("should increase in Quality by 2 when there are 10 days or less", () => {
          const gildedRose = inn([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2),
          ]);

          expect(gildedRose.updateQuality()[0].quality).toEqual(4);
          expect(gildedRose.updateQuality()[0].quality).toEqual(6);
          expect(gildedRose.updateQuality()[0].quality).toEqual(8);
          expect(gildedRose.updateQuality()[0].quality).toEqual(10);
          expect(gildedRose.updateQuality()[0].quality).toEqual(12);
        });

        it("should increase in Quality by 3 when there are 5 days or less", () => {
          const gildedRose = inn([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2)]);

          expect(gildedRose.updateQuality()[0].quality).toEqual(5);
          expect(gildedRose.updateQuality()[0].quality).toEqual(8);
          expect(gildedRose.updateQuality()[0].quality).toEqual(11);
          expect(gildedRose.updateQuality()[0].quality).toEqual(14);
          expect(gildedRose.updateQuality()[0].quality).toEqual(17);
        });
      });

      it("should drop quality to 0 after the concert", () => {
        const gildedRose = inn([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);

        expect(gildedRose.updateQuality()[0].quality).toEqual(0);
      });

      it("should never be more than 50", () => {
        const gildedRose = inn([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);

        expect(gildedRose.updateQuality()[0].quality).toEqual(50);
        expect(gildedRose.updateQuality()[0].quality).toEqual(50);
      });
    });
  });
});
