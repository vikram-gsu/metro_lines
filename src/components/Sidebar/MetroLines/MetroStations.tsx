import * as React from "react";
import styles from "./MetroLines.module.css";
import { StationInfo } from "../../../types/MetroMapData.d";
import { Station } from "./MetroStationPanel";
import { ThemedButton } from '../ThemedButton';
const classNames = require("classnames");

interface StationsProps {
  line_name: string;
  stations_on_line: Array<StationInfo>;
  onLineSelect(line: string, value: number): void;
  zoomToLine(line: string): void;
  highlightStation(stationName: string): void;
}

const Stations = (stationsProps: StationsProps) => {
  const onLineButtonClick = () => {
    stationsProps.zoomToLine(stationsProps.line_name);
  };

  const onLineButtonHoverIn = () => {
    stationsProps.onLineSelect(stationsProps.line_name, 1);
  };

  const onLineButtonHoverOut = () => {
    stationsProps.onLineSelect(stationsProps.line_name, -1);
  };

  const StationNameList = () => {
    return (
      <ul className={styles.stationList}>
        {stationsProps.stations_on_line.map(station => (
          <Station
            key={station.name}
            station={station}
            highlightStation={stationsProps.highlightStation}
          />
        ))}
      </ul>
    );
  };
  return (
    <li>
      <ThemedButton
        // className={classNames(styles.primary, styles[stationsProps.line_name])}
        // onMouseEnter={onLineButtonHoverIn}
        // onMouseLeave={onLineButtonHoverOut}
        onClick={onLineButtonClick}
      >
        {stationsProps.line_name}
      </ThemedButton>
      {stationsProps.stations_on_line.length !== 0 &&
        stationsProps.stations_on_line.filter(
          station => station.line === stationsProps.line_name
        ).length !== 0 && <StationNameList />}
    </li>
  );
};

export { Stations };
