import { DataFunctions } from "./data_functions";

const dataFunctions = new DataFunctions();

it("gets station names", () => {
  expect(dataFunctions.getStationNames("red").length).toEqual(27);
});

it("gets line filtered data", () => {
  const redLineData = dataFunctions.getLineFilteredData('red', 8);
  expect(redLineData.features.length).toEqual(27);
});