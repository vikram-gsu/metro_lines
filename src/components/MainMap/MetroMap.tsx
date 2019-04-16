import * as React from "react";
import {
  Map,
  TileLayer,
} from "react-leaflet";
// import { Feature, Geometry, GeoJsonProperties, GeoJsonObject } from "geojson";
import { LatLngLiteral } from "leaflet";
import { ActualLines } from "./ActualLines";
import { MetroSidebar } from "../Sidebar/MetroSidebar";

// types
import { MetroStationsData } from "./MetroMap.d";
// geojson data
const metroStations: MetroStationsData = require("../../data/all_metro_stations.json");

interface LineKey {
  color: string;
  key: string;
}
interface State {
  sidebar_collapsed: boolean;
  sidebar_selected: string;
  station_marker_radius: number;
  line_keys: Array<LineKey>;
  position: LatLngLiteral;
  zoom: number;
  selected_station_info: {
    line_name: string;
    station_names: string[]
  };
}

export class MetroMap extends React.Component<{}, State> {
  state: State = {
    sidebar_collapsed: false,
    sidebar_selected: "home",
    station_marker_radius: 8,
    line_keys: [{color: "red", key: "red-8"}, {color: "blue", key: "blue-8"}, {color: "green", key: "green-8"}],
    position: { lat: 17.42271835184761, lng: 78.64974975585939 },
    zoom: 11,
    selected_station_info: {line_name:'', station_names:[]}
  };
  public mapRef: React.RefObject<any> = React.createRef();

  private updateStationRadius = (line: string, value: number) => {
    this.setState(prevState => ({
      ...prevState,
      station_marker_radius: prevState.station_marker_radius + value,
      line_keys: prevState.line_keys.map(line_key => line_key.color == line? {...line_key, key: line_key.color + "-" + (prevState.station_marker_radius + value).toString()}:line_key)
      
    }));
  };

  private getStationNames = (line: string) => (
                  metroStations.features.filter(
                        feature => feature.properties.line === line || 
                                  feature.properties.line.indexOf(line) !== -1)
                        .map(feature => feature.properties.name));

  private zoomToLine = (line: string) => {
    this.setState(prevState => ({
      ...prevState,
      // position: {lat : 17.4241047, lng: 78.4570069},
      zoom: 12,
      selected_station_info:{
        line_name: line,
        station_names:this.getStationNames(line)},
    }));
  }

  private getLineInfo = (line: string) => {
    return {
      line_key: this.state.line_keys.filter(line_color => line_color.color == line)[0]["key"] as string,
      line_data: {
        ...metroStations,
        features: metroStations.features.filter(
          feature =>
            feature.properties.line == line ||
            feature.properties.line.indexOf(line) != -1
        ).map(feature => (
          {...feature,  
            properties:{...feature.properties, 
                        station_radius: this.state.station_marker_radius}}
        ))
      }
    }
  }


  render() {
    const {position, zoom} = this.state;
    return (
      <>
        <MetroSidebar updateStationRadius={this.updateStationRadius} zoomToLine={this.zoomToLine} selected_station_info={this.state.selected_station_info}/>
        <Map center={position} zoom={zoom} ref={this.mapRef}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          id= "mapbox.light"
          url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
        /> */}

          <ActualLines
            line_info={[
              this.getLineInfo("red"),this.getLineInfo("blue")
            ]}
          />
        </Map>
      </>
    );
  }
}