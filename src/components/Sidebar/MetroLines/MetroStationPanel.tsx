import * as React from 'react';
import { StationInfo } from "../../../types/MetroMapData.d";
import { DataFunctions } from "../../../data/data_functions";
import {StationTimes} from './StationTimes';
const dataFunctions = new DataFunctions();

interface CircleSVGProps {
  color: string;
  radius: number;
}

const CircleSVG = ({ color, radius }: CircleSVGProps) => (
  <svg height="30" width="30">
    <circle
      cx="20"
      cy="20"
      r={radius}
      stroke="black"
      strokeWidth="1"
      fill={color}
    />
  </svg>
);

export interface StationProps {
  station: StationInfo;
  highlightStation(stationName: string): void;
}

export interface StationState {
  stationTimes?: StationTimes;
  nextTrain: string;
}

// const NextTrainStatus = () => {
//   return (

//   );
// }

export class Station extends React.Component<StationProps, StationState> {

  state = {
    stationTimes: undefined,
    nextTrain: ''
  }
  onStationNameHover = () => {
    // this.props.highlightStation(this.props.station.name);
  };

  onStationNameClick = () => {
    this.setState({
      // stationTimes: dataFunctions.getTrainTimesForStation(this.props.station.name, true),
      nextTrain: dataFunctions.getNextTrainTime(this.props.station.name, true)
    })
  };

  render() {
    const { station } = this.props;
    return (
      <li
        onMouseEnter={this.onStationNameHover}
        onClick={this.onStationNameClick}
      >
        <CircleSVG color={station.line} radius={station.station_radius} />
        <span>{station.name}</span>

        {this.state.nextTrain != '' && <span>Next Train in {this.state.nextTrain} minutes</span>}
        {/* {this.state.stationTimes && <StationTimes stationTimes={this.state.stationTimes!} />} */}
      </li>
    );
  }
}