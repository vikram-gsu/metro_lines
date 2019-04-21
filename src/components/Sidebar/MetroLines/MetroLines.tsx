import * as React from "react";
import styles from "./MetroLines.module.css";
import { Stations } from "./MetroStations";
import { StationInfo } from "../../../types/MetroMapData";
import { DataFunctions } from "../../../data/data_functions";

const dataFunctions = new DataFunctions();
export interface LinesProps {
  stations_on_line: Array<StationInfo>;
  line_names: string[];
  onLineSelect(line: string, value: number): void;
  zoomToLine(line: string): void;
  highlightStation(stationName: string): void;
}

export const Lines = (lineProps: LinesProps) => {
  return (
    <React.Fragment>
      <ul className={styles.listTabStyle}>
        {lineProps.line_names.map((lineName: string) => (
          <Stations
            line_name={lineName}
            stations_on_line={lineProps.stations_on_line}
            key={lineName}
            onLineSelect={lineProps.onLineSelect}
            zoomToLine={lineProps.zoomToLine}
            highlightStation={lineProps.highlightStation}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};
