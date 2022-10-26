import RotateEngine from "../lib/RotateEngine";

describe("RotateEngine", () => {
  let instance: RotateEngine;

  const data = [
    { id: "1", json: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { id: "2", json: [40, 20, 90, 10] },
    { id: "3", json: [-5] },
    { id: "4", json: [2, -0] },
    { id: "5", json: [2, -5, -5] },
    { id: "6", json: [1, 1, 1, 1, 1] },
  ];

  beforeEach(() => {
    instance = new RotateEngine(data);
  });

  it("Should create an instance of RotateEngine", async () => {
    expect(instance).toBeInstanceOf(RotateEngine);
  });

  it("Should run validate on list", () => {
    expect(instance.validList(data[0].json)).toBeTruthy();
    expect(instance.validList(data[1].json)).toBeTruthy();
    expect(instance.validList(data[2].json)).toBeTruthy();
    expect(instance.validList(data[3].json)).toBeFalsy();
    expect(instance.validList(data[4].json)).toBeFalsy();
    expect(instance.validList(data[5].json)).toBeFalsy();
  });

  it("Should return rotated expected content to form matrix after validation", () => {
    const rotatedDataAfterValidation = [
      {
        id: "1",
        json: JSON.stringify([4, 1, 2, 7, 5, 3, 8, 9, 6]),
        is_valid: true,
      },
      { id: "2", json: JSON.stringify([90, 40, 10, 20]), is_valid: true },
      { id: "3", json: JSON.stringify([-5]), is_valid: true },
      { id: "4", json: JSON.stringify([]), is_valid: false },
      { id: "5", json: JSON.stringify([]), is_valid: false },
      { id: "6", json: JSON.stringify([]), is_valid: false },
    ];

    expect(instance.rotate()).toEqual(rotatedDataAfterValidation);
  });
});
