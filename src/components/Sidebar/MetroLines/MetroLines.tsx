import * as React from "react";
import styles from "./MetroLines.module.css";
import {Stations} from './MetroStations';

export interface LinesProps {
  
  selected_station_info: {
    line_name: string;
    station_names: string[]
  };
  line_names: string[];
  onLineSelect(line:string, value: number):void;
  zoomToLine(line: string): void;
};

export const Lines = (lineProps: LinesProps) => {
  return (
    <React.Fragment>
      <ul className={styles.listTabStyle}>
        {
          lineProps.line_names.map((line_name:string) => (
            <Stations 
              line_name={line_name} 
              selected_station_info={lineProps.selected_station_info} 
              key={line_name} 
              onLineSelect={lineProps.onLineSelect}
              zoomToLine={lineProps.zoomToLine}
            />
          ))
        }
      </ul>
    </React.Fragment>
  );

}
