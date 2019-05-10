import * as React from "react";
import styles from "./MetroLines.module.css";
import { MetroStations } from "./MetroStations";
import { StationInfo } from "../../../types/MetroMapData";
import { DataFunctions } from "../../../data/data_functions";
import { ThemedButton } from "../Common/ThemedButton";
const classNames = require("classnames");

const dataFunctions = new DataFunctions();
export interface MetroLinesProps {
  stations_on_line: Array<StationInfo>;
  line_names: string[];
  onLineSelect(line: string, value: number): void;
  zoomToLine(line: string): void;
  highlightStation(stationName: string): void;
}
export interface MetroLinesState {
  selected_line: string
}

export class MetroLines extends React.Component<MetroLinesProps> {
  state = { selected_line: 'red'}
  render(){
    return (
      <div className={styles.linesPanel}>
        <ul>
            {this.props.line_names.map((lineName: string) => (
              <li key={lineName}>
                <ThemedButton
                  color={lineName}
                  onClick={() => this.props.zoomToLine(lineName)}
                >
                  {lineName}
                </ThemedButton>
              </li>
            ))}
        </ul>
        <MetroStations
          line_name={this.state.selected_line}
          stations_on_line={this.props.stations_on_line}
          onLineSelect={this.props.onLineSelect}
          highlightStation={this.props.highlightStation}
        />
      </div>
    );
  }
}
