import * as React from "react";
import { StationInfo } from "../../../types/MetroMapData.d";
import { MetroStationPanel } from "./SingleStationPanel";

interface StationsProps {
  line_name: string;
  stations_on_line: Array<StationInfo>;
  onLineSelect(line: string, value: number): void;
  highlightStation(stationName: string): void;
}

const MetroStations = (stationsProps: StationsProps) => {

  const onLineButtonHoverIn = () => {
    stationsProps.onLineSelect(stationsProps.line_name, 1);
  };

  const onLineButtonHoverOut = () => {
    stationsProps.onLineSelect(stationsProps.line_name, -1);
  };

  const StationNameList = () => {
    return (
      <ul>
        {stationsProps.stations_on_line.map(station => (
          <MetroStationPanel
            key={station.station_name}
            stationInfo={station}
            highlightStation={stationsProps.highlightStation}
          />
        ))}
      </ul>
    );
  };
  return (
      <StationNameList />
  );
};

export { MetroStations };
