import * as React from 'react';
import styles from './MetroLines.module.css';

var classNames = require('classnames');

interface StationProps {
  line_name: string;
  selected_station_info: {
    line_name: string;
    station_names: string[]
  };  onLineSelect(line:string, value: number):void;
  zoomToLine(line:string):void;

}

const Stations = (stationProps : StationProps) => {
  const onLineButtonClick = () => {
    stationProps.zoomToLine(stationProps.line_name);
  }

  const onLineButtonHoverIn = () => {
    stationProps.onLineSelect(stationProps.line_name, 1);
  }

  const onLineButtonHoverOut = () => {
    stationProps.onLineSelect(stationProps.line_name, -1)
  }
  const StationNameList = () => {
    return (
      <ul className={styles.stationList}>
        {stationProps.selected_station_info.station_names.map(station_name => (
          <li key={station_name}>{station_name}</li>
        ))}
      </ul>
    )
  }
  return (
    <li>
      <button 
        className={classNames(styles.primary, styles[stationProps.line_name])} 
        onMouseEnter={onLineButtonHoverIn}
        onMouseLeave={onLineButtonHoverOut}
        onClick={onLineButtonClick}>
          {stationProps.line_name}
      </button>
      { stationProps.selected_station_info.station_names.length !== 0 && 
        stationProps.selected_station_info.line_name === stationProps.line_name &&
      <StationNameList /> }
    </li>
  );
}

export {Stations};