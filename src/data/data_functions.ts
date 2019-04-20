import { MetroStationsData, StationInfo } from "../types/MetroMapData";
const metroStations: MetroStationsData = require("./all_metro_stations.json");


export class DataFunctions {

  public getStationNames = (line: string) => (
    metroStations.features.filter(
          feature => feature.properties.line === line || 
                    feature.properties.line.indexOf(line) !== -1)
          .map(feature => feature.properties.name));

  public getStationsOnLine = (line: string) => (
    metroStations.features.filter(feature => feature.properties.line === line || 
      feature.properties.line.indexOf(line) !== -1)
      .map(feature => feature.properties)
  )

  public getGeoJsonDataForLine = (line: string, stationRadius: number) => (
    {
      ...metroStations,
      features: metroStations.features.filter(
        feature =>
          feature.properties.line == line ||
          feature.properties.line.indexOf(line) != -1
      ).map(feature => (
        {...feature,  
          properties:{...feature.properties, 
                      station_radius: stationRadius}}
      ))
    }
  )
}
