import * as React from 'react';

export interface LinesProps {
  station_names:string[],
  line_names: string[],
  onLineSelect(line:string, value: number):void
}

export const Lines = (lines:LinesProps) => {
  return (
    <React.Fragment>
      <ul>
        {
          lines.line_names.map((line_name:string) => (
            <Stations line_name={line_name} stations={lines.station_names} key={line_name} onLineSelect={lines.onLineSelect} />
          ))
        }
      </ul>
    </React.Fragment>
  );

}

interface StationProps {
  line_name: string, 
  stations: string[],
  onLineSelect(line:string, value: number):void
}

const Stations = (stations:StationProps) => {
  return (
    <li>
      <button onMouseEnter={() => stations.onLineSelect(stations.line_name, 1)}
              onMouseLeave={() => stations.onLineSelect(stations.line_name, -1)}>
        {stations.line_name}
      </button>
    </li>
  );
}