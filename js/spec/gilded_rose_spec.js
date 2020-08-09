describe("Gilded Rose", function () {
  describe("Quality", () => {
    it("should degrade every day by 1", () => {
      items = [new Item("Item", 5, 20)];
      update_quality();
      expect(items[0].quality).toEqual(19);
      update_quality();
      expect(items[0].quality).toEqual(18);
      update_quality();
      expect(items[0].quality).toEqual(17);
    });

    it("should degrade twice as fast once the sell by date has passed", () => {
      items = [new Item("Item", 1, 20)];
      update_quality();
      expect(items[0].quality).toEqual(19);
      update_quality();
      expect(items[0].quality).toEqual(17);
      update_quality();
      expect(items[0].quality).toEqual(15);
    });

    it("should never be negative", () => {
      items = [new Item("Item", 5, 1)];
      update_quality();
      expect(items[0].quality).toEqual(0);
      update_quality();
      expect(items[0].quality).toEqual(0);
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    describe("Aged Brie", () => {
      it("should increase in Quality (+1) the older it gets", () => {
        items = [new Item("Aged Brie", 5, 2)];

        update_quality();
        expect(items[0].quality).toEqual(3);
        update_quality();
        expect(items[0].quality).toEqual(4);
        update_quality();
        expect(items[0].quality).toEqual(5);
      });

      it("should never be more than 50", () => {
        items = [new Item("Aged Brie", 5, 49)];
        update_quality();
        expect(items[0].quality).toEqual(50);
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });

    describe("Sulfuras, Hand of Ragnaros", () => {
      it("should always have a quality of 80", () => {
        items = [new Item("Sulfuras, Hand of Ragnaros", 5, 10)];
        update_quality();
        expect(items[0].quality).toEqual(80);
      });

      it("should never decrease in Quality", () => {
        items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
        update_quality();
        expect(items[0].quality).toEqual(80);
        update_quality();
        expect(items[0].quality).toEqual(80);
      });

      it("should never have to be sold", () => {
        items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
        update_quality();
        expect(items[0].sell_in).toEqual(5);
        update_quality();
        expect(items[0].sell_in).toEqual(5);
      });
    });

    describe("Backstage passes to a TAFKAL80ETC concert", () => {
      describe("increase in Quality the older they get", () => {
        it("should increase in Quality by 2 when there are 10 days or less", () => {
          items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2),
          ];

          update_quality();
          expect(items[0].quality).toEqual(4);
          update_quality();
          expect(items[0].quality).toEqual(6);
          update_quality();
          expect(items[0].quality).toEqual(8);
          update_quality();
          expect(items[0].quality).toEqual(10);
          update_quality();
          expect(items[0].quality).toEqual(12);
        });

        it("should increase in Quality by 3 when there are 5 days or less", () => {
          items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2)];

          update_quality();
          expect(items[0].quality).toEqual(5);
          update_quality();
          expect(items[0].quality).toEqual(8);
          update_quality();
          expect(items[0].quality).toEqual(11);
          update_quality();
          expect(items[0].quality).toEqual(14);
          update_quality();
          expect(items[0].quality).toEqual(17);
        });
      });

      it("should drop quality to 0 after the concert", () => {
        items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)];

        update_quality();
        expect(items[0].quality).toEqual(0);
      });

      it("should never be more than 50", () => {
        items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];

        update_quality();
        expect(items[0].quality).toEqual(50);
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });
  });
});
