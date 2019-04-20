import * as React from "react";
import styles from "./MetroLines.module.css";
import { StationInfo } from "../../../types/MetroMapData";

const classNames = require("classnames");

interface StationProps {
  line_name: string;
  stations_on_line: Array<StationInfo>;
  onLineSelect(line: string, value: number): void;
  zoomToLine(line: string): void;
}

const Stations = (stationProps: StationProps) => {
  const onLineButtonClick = () => {
    stationProps.zoomToLine(stationProps.line_name);
  };

  const onLineButtonHoverIn = () => {
    stationProps.onLineSelect(stationProps.line_name, 1);
  };

  const onLineButtonHoverOut = () => {
    stationProps.onLineSelect(stationProps.line_name, -1);
  };
  const StationNameList = () => {
    return (
      <ul className={styles.stationList}>
        {stationProps.stations_on_line.map(station => (
          <li key={station.name}>{station.name}</li>
        ))}
      </ul>
    );
  };
  return (
    <li>
      <button
        className={classNames(styles.primary, styles[stationProps.line_name])}
        onMouseEnter={onLineButtonHoverIn}
        onMouseLeave={onLineButtonHoverOut}
        onClick={onLineButtonClick}
      >
        {stationProps.line_name}
      </button>
      {stationProps.stations_on_line.length !== 0 &&
        stationProps.stations_on_line.filter(
          station => station.line === stationProps.line_name
        ).length !== 0 && <StationNameList />}
    </li>
  );
};

export { Stations };
