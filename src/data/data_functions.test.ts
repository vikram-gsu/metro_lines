import { DataFunctions } from "./data_functions";

const dataFunctions = new DataFunctions();

it("gets station names", () => {
  expect(dataFunctions.getStationNames("red").length).toEqual(27);
});

