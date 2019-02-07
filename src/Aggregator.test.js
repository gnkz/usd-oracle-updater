const { Median } = require("./Aggregator");

describe("Median", async () => {

  test("it should fail if feeds is not an array", async () => {
    await expect(Median(1)).rejects.toThrow(/must be an array/);
    await expect(Median({})).rejects.toThrow(/must be an array/);
    await expect(Median(true)).rejects.toThrow(/must be an array/);
    await expect(Median("1")).rejects.toThrow(/must be an array/);
  });

  test("it should fail if feeds is an empty array", async () => {
    await expect(Median([])).rejects.toThrow(/are empty/);
  });

  test("it should fail if feeds have only null values", async () => {
    const feeds = [
      new Promise(res => res(null)),
      new Promise(res => res(undefined)),
    ];

    await expect(Median(feeds)).rejects.toThrow(/All feeds failed/);
  });

  test("it should return the median of one feed", async () => {
    const feeds = [
      new Promise(res => res(10.1)),
    ];

    await expect(Median(feeds)).resolves.toBe(10.1);
  });

  test("it should return the mean if there are only 2 feeds", async () => {
    const feeds = [
      new Promise(res => res(7)),
      new Promise(res => res(8)),
    ];

    await expect(Median(feeds)).resolves.toBe(7.5);
  });

  test("it should return the mid value if there are 3 feeds", async() => {
    const feeds = [
      new Promise(res => res(10)),
      new Promise(res => res(1)),
      new Promise(res => res(5.5)),
    ];

    await expect(Median(feeds)).resolves.toBe(5.5);
  });

  test("it should ignore null values", async() => {
    const feeds = [
      new Promise(res => res(null)),
      new Promise(res => res(1)),
    ];
    
    await expect(Median(feeds)).resolves.toBe(1);
  });
});
