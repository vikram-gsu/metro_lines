import * as React from "react";
import { IoIosHome } from "react-icons/io";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker,
  LatLngBounds,
  LatLng,
  Point,
  MapLayer
} from "react-leaflet";
import { Feature, Geometry, GeoJsonProperties, GeoJsonObject } from "geojson";
// import L, { LatLngLiteral } from 'leaflet';
import { ActualLines } from "./ActualLines";
import { MetroSidebar } from "./MetroSidebar";

//types
import { Layer, LeafletEvent, LatLngExpression } from "leaflet";
import { MetroStationsFeature, MetroStationsData } from "./MetroMap.d";
import {Map as tsMap} from 'typescript'
//geojson data
const metro_stations: MetroStationsData = require("./data/all_metro_stations.json");

interface line_key {
  color:string,
  key: string
}
interface State {
  sidebar_collapsed: boolean;
  sidebar_selected: string;
  station_marker_radius: number;
  line_keys: line_key[];
}

export class MetroMap extends React.Component<{}, State> {
  state: State = {
    sidebar_collapsed: false,
    sidebar_selected: "home",
    station_marker_radius: 8,
    line_keys: [{color: 'red', key: 'red-8'}, {color: 'blue', key: 'blue-8'}, {color: 'green', key: 'green-8'}]
  };
  mapRef: React.RefObject<any> = React.createRef();

  updateStationRadius = (line: string, value: number) => {
    this.setState(prevState => ({
      ...prevState,
      station_marker_radius: prevState.station_marker_radius + value,
      line_keys: prevState.line_keys.map(line_key => line_key.color == line? {...line_key, key: line_key.color + '-' + (prevState.station_marker_radius + value).toString()}:line_key)
      
    }));
  };

  getLineInfo = (line: string) => {
    return {
      line_key: this.state.line_keys.filter(line_color => line_color.color == line)[0]['key'] as string,
      line_data: {
        ...metro_stations,
        features: metro_stations.features.filter(
          feature =>
            feature.properties.line == line ||
            feature.properties.line.indexOf(line) != -1
        ).map(feature => (
          {...feature,  properties:{...feature.properties, station_radius: this.state.station_marker_radius}}
        ))
      }
    }
  }

  render() {
    const position = { lat: 17.42271835184761, lng: 78.64974975585939 };
    return (
      <>
        <MetroSidebar updateStationRadius={this.updateStationRadius} />
        <Map center={position} zoom={11} ref={this.mapRef}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          id= 'mapbox.light'
          url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
        /> */}

          <ActualLines
            line_info={[
              this.getLineInfo('red'),this.getLineInfo('blue')
            ]}
          />
        </Map>
      </>
    );
  }
}