import * as React from 'react';
import { StationInfo } from "../../../types/MetroMapData.d";
import { DataFunctions } from "../../../data/data_functions";
import {StationTimes} from './StationTimes';
import styles from './SingleStationPanel.module.css';

const dataFunctions = new DataFunctions();

interface CircleSVGProps {
  color: string;
  radius: number;

}

const CircleSVG = ({ color, radius }: CircleSVGProps) => (
  <svg height="30" width="30" className={styles.marker}>
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

export interface StationDetailProps {
  stationInfo: StationInfo;
}
const StationDetail = (props: StationDetailProps) => {
  const {station_name, station_type, line_name, mmts_connection, 
    rail_connection, bus_connection, parking_type} = props.stationInfo;
  const connectingStations = station_type === 'connecting'?line_name.split('/'):null
  const hasConnections = connectingStations || bus_connection || mmts_connection || rail_connection
  return (
    <div>
      <h3>{station_name}</h3>
      <div>
        {hasConnections?
        <div>
          Connection available for: 
          <ul>
          {connectingStations && <li>{connectingStations[0]} and {connectingStations[1]} metro lines</li>}
          {bus_connection && <li>Local Bus Network</li>}
          {mmts_connection && <li>MMTS Train Network</li>}
          {rail_connection && <li>Indian Train Network</li>}
          </ul>
        </div>
        :
        <div>No Connections available</div>
        }
        <div>
          Parking: 
          {parking_type === "none" && <span>No Parking available in this station</span>}
          {parking_type === "street" && <span>Street parking only</span>}
          {parking_type === "additional" && <span>Additional Parking space available(in addition to street parking)</span>}
          
        </div>
      </div>
    </div>
  );
}

export interface StationProps {
  stationInfo: StationInfo;
  highlightStation(stationName: string): void;
}

export interface StationState {
  stationTimes?: StationTimes;
  nextTrain: string;
  showPanel:boolean;
}



export class MetroStationPanel extends React.Component<StationProps, StationState> {

  state = {
    stationTimes: undefined,
    nextTrain: '',
    showPanel: false
  }
  onStationNameHover = () => {
    // this.props.highlightStation(this.props.station.name);
  };

  onStationNameClick = () => {
    this.setState(prevState => ({
      // stationTimes: dataFunctions.getTrainTimesForStation(this.props.station.name, true),
      nextTrain: dataFunctions.getNextTrainTime(this.props.stationInfo.station_name, true),
      showPanel: !prevState.showPanel
    }))
  };

  render() {
    const { stationInfo } = this.props;
    return (
      <li
        onMouseEnter={this.onStationNameHover}
        onClick={this.onStationNameClick}
        className={styles.stationPanel}
      >
        <div className={styles.stationName}>
          <CircleSVG color={stationInfo.line_name} radius={stationInfo.station_radius} />
          <span className={styles.title}>{stationInfo.station_name}</span>
          <ul className= {styles.nextTrain}>
            <li className={styles.nextTrain}>→ LB Nagar in {this.state.nextTrain} mins</li>
            <li className={styles.nextTrain}>→ Miyapur in {this.state.nextTrain} mins</li>
          </ul>
        </div>
        {this.state.showPanel && <StationDetail stationInfo={stationInfo} />}
        {/* {this.state.stationTimes && <StationTimes stationTimes={this.state.stationTimes!} />} */}
      </li>
    );
  }
}