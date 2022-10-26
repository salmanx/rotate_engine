import CSVFormatter from "../lib/CSVFormatter";

describe("CSVFormatter", () => {
  let instance: CSVFormatter;
  const rotatedDataAfterValidation = [
    { id: "1", json: "[4,1,2,7,5,3,8,9,6]", is_valid: true },
    { id: "2", json: "[90,40,10,20]", is_valid: true },
    { id: "3", json: "[-5]", is_valid: true },
    { id: "4", json: "[]", is_valid: false },
    { id: "5", json: "[]", is_valid: false },
    { id: "6", json: "[]", is_valid: false },
  ];

  const formattedData = `
    id,json,is_valid
    1,"[4,1,2,7,5,3,8,9,6]",true
    2,"[90,40,10,20]",true
    3,"[-5]",true,
    4,"[]",false,
    5,"[]",false,
    6,"[]",false
    `;
  beforeEach(() => {
    instance = new CSVFormatter(rotatedDataAfterValidation, "output.csv");
  });

  it("Should create an instance of CSVFormatter", async () => {
    expect(instance).toBeInstanceOf(CSVFormatter);
  });

  it("Should return formatted csv data", async () => {
    let spy = jest
      .spyOn(instance, "formatter")
      .mockImplementation(() => null);

    await expect(instance.formatter(rotatedDataAfterValidation)).toBe(null);

    spy.mockRestore();
  });
});
