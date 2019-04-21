import moment from "moment";
import { MetroStationsData, StationInfo, MetroStationsFeature } from "../types/MetroMapData";
const metroStations: MetroStationsData = require("./all_metro_stations.json");

export class DataFunctions {
  public getStationNames = (line: string) =>
    metroStations.features
      .filter(
        feature =>
          feature.properties.line === line ||
          feature.properties.line.indexOf(line) !== -1
      )
      .map(feature => feature.properties.name);

  public getStationsOnLine = (line: string, stationRadius: number) =>
    metroStations.features
      .filter(
        feature =>
          feature.properties.line === line ||
          feature.properties.line.indexOf(line) !== -1
      )
      .map(feature => ({
        ...feature.properties,
        station_radius: stationRadius
      }));

  public getLineFilteredData = (line: string, stationRadius: number) => ({
    ...metroStations,
    features: metroStations.features
      .filter(
        feature =>
          feature.properties.line == line ||
          feature.properties.line.indexOf(line) != -1
      )
      .map(feature => ({
        ...feature,
        properties: { ...feature.properties, station_radius: stationRadius }
      }))
  });

  public getTrainTimesForStation = (stationName: string, weekdays: boolean) => {
    const startTime = 630;
    let morningTimes: string[],
      noonTimes: string[],
      eveningTimes: string[],
      nightTimes: string[];
    morningTimes = [];
    noonTimes = [];
    eveningTimes = [];
    nightTimes = [];
    let nextTime = moment(startTime.toString(), "hmm");
    while (moment(nextTime).isSameOrBefore(moment("2230", "hmm"))) {
      switch (true) {
        case moment(nextTime).isSameOrAfter(moment("630", "hmm")) &&
          moment(nextTime).isBefore(moment("1030", "hmm")):
          morningTimes.push(moment(nextTime).format("hh:mm a"));
          break;
        case moment(nextTime).isSameOrAfter(moment("1030", "hmm")) &&
          moment(nextTime).isBefore(moment("1430", "hmm")):
          noonTimes.push(moment(nextTime).format("hh:mm a"));
          break;
        case moment(nextTime).isSameOrAfter(moment("1430", "hmm")) &&
          moment(nextTime).isBefore(moment("1830", "hmm")):
          eveningTimes.push(moment(nextTime).format("hh:mm a"));
          break;
        case moment(nextTime).isSameOrAfter(moment("1830", "hmm")) &&
          moment(nextTime).isBefore(moment("2230", "hmm")):
          nightTimes.push(moment(nextTime).format("hh:mm a"));
          break;
      }
      nextTime = moment(nextTime).add(8, "minutes");
    }
    return { morningTimes, noonTimes, eveningTimes, nightTimes };
  };

  public getNextTrainTime = (stationName: string, weekdays: boolean) => {
    const startingStationStartTime = 630;
    const fn = (feature:MetroStationsFeature) => feature.properties.name === stationName;
    const currentStationStartTime = 630 + (metroStations.features.findIndex(fn) + 1) * 2;
    const currentStationEndTime = 2230 + (metroStations.features.findIndex(fn) + 1) * 2;

    let trainTimes: string[] = [];

    let nextTime = moment(currentStationStartTime.toString(), "hmm");
    while (nextTime.isSameOrBefore(moment(currentStationEndTime.toString(), "hmm"))) {
      if (nextTime.isSameOrAfter(moment())){
        return (Number(nextTime.format("hhmm")) - Number(moment().format("hhmm"))).toString();
      }
      nextTime = moment(nextTime).add(8, "minutes");
    }
    return "There are no more trains running today at this station";
  }

  public getNextTrainTimeInReverse = (stationName: string, weekdays: boolean) => {
    const startingStationStartTime = 630;
    
    const fn = (feature:MetroStationsFeature) => feature.properties.name === stationName;
    const currentStationStartTime = 630 + (metroStations.features.findIndex(fn) + 1) * 2;
    const currentStationEndTime = 2230 + (metroStations.features.findIndex(fn) + 1) * 2;

    let trainTimes: string[] = [];

    let nextTime = moment(currentStationStartTime.toString(), "hmm");
    while (nextTime.isSameOrBefore(moment(currentStationEndTime.toString(), "hmm"))) {
      if (nextTime.isSameOrAfter(moment())){
        return (Number(nextTime.format("hhmm")) - Number(moment().format("hhmm"))).toString();
      }
      nextTime = moment(nextTime).add(8, "minutes");
    }
    return "There are no more trains running today at this station";
  }
}
