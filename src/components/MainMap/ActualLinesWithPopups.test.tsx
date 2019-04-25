import React from 'react';
// import ReactDOM from 'react-dom';
import {ActualLines} from './ActualLinesWithPopups';
import { shallow } from 'enzyme';
import {MetroStationsData} from '../../types/MetroMapData';

const metroStationsSampleData:MetroStationsData = {
  "type": "FeatureCollection",
  "name": "public-transport-point",
  "features": [{
      "type": "Feature",
      "properties": {
        "name": "Miyapur",
        "station": "normal",
        "line": "red",
        "mmts_connection": false,
        "rail_connection": false,
        "bus_connection": false,
        "parking": "additional"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [78.3717978000641, 17.496601502631503]
      }
    }]
  } as MetroStationsData

it('actual lines component renders without crashing', () => {
  shallow(<ActualLines line_info= {[{line_key:'red', line_data:metroStationsSampleData}]}/>);
});
