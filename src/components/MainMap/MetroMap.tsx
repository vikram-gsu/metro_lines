import * as React from "react";
import { Map, TileLayer } from "react-leaflet";
// import { Feature, Geometry, GeoJsonProperties, GeoJsonObject } from "geojson";
import { LatLngLiteral } from "leaflet";
import { ActualLines } from "./ActualLinesWithPopups";
import { MetroSidebar } from "../Sidebar/MetroSidebar";

// types
import { MetroStationsData, StationInfo } from "../../types/MetroMap";
import { DataFunctions } from "../../data/data_functions";

const dataFunctions = new DataFunctions();
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
  stations_on_line: Array<StationInfo>;
}

export class MetroMap extends React.Component<{}, State> {
  public state: State = {
    sidebar_collapsed: false,
    sidebar_selected: "home",
    station_marker_radius: 8,
    line_keys: [
      { color: "red", key: "red-8" },
      { color: "blue", key: "blue-8" },
      { color: "green", key: "green-8" }
    ],
    position: { lat: 17.42271835184761, lng: 78.64974975585939 },
    zoom: 11,
    stations_on_line: []
  };
  public mapRef: React.RefObject<any> = React.createRef();

  private updateStationRadius = (line: string, value: number) => {
    this.setState(prevState => ({
      ...prevState,
      station_marker_radius: prevState.station_marker_radius + value,
      line_keys: prevState.line_keys.map(lineKey =>
        lineKey.color === line
          ? {
              ...lineKey,
              key:
                lineKey.color +
                "-" +
                (prevState.station_marker_radius + value).toString()
            }
          : lineKey
      )
    }));
  }

  private zoomToLine = (line: string) => {
    this.setState(prevState => ({
      ...prevState,
      // position: {lat : 17.4241047, lng: 78.4570069},
      zoom: 12,
      stations_on_line: dataFunctions.getStationsOnLine(line)
    }));
  }

  private getLineInfo = (line: string) => {
    return {
      line_key: this.state.line_keys.filter(
        line_color => line_color.color === line
      )[0]["key"] as string,
      line_data: dataFunctions.getGeoJsonDataForLine(
        line,
        this.state.station_marker_radius,
      ),
    };
  }

  public render() {
    const { position, zoom } = this.state;
    return (
      <>
        <React.StrictMode>
          <MetroSidebar
            updateStationRadius={this.updateStationRadius}
            zoomToLine={this.zoomToLine}
            stations_on_line={this.state.stations_on_line}
          />
          <Map center={position} zoom={zoom} ref={this.mapRef}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            id= "mapbox.light"
            url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
          /> */}

            <ActualLines
              line_info={[this.getLineInfo("red"), this.getLineInfo("blue")]}
            />
          </Map>
        </React.StrictMode>
      </>
    );
  }
}
