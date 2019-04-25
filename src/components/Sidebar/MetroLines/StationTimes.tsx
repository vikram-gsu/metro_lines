import * as React from "react";

export interface StationTimes {
  morningTimes: string[];
  noonTimes: string[];
  eveningTimes: string[];
  nightTimes: string[];
}

export interface StationTimesProps {
  stationTimes: StationTimes;
}
export const StationTimes = ({ stationTimes }: StationTimesProps) => {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Morning</th>
            <th>Noon</th>
            <th>Evening</th>
            <th>Night</th>
          </tr>
        </thead>
        <tbody>
          {stationTimes.morningTimes.map((mTime: string) => (
            <tr key={mTime}>
              <td>{mTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
