import * as React from "react";
import { Map, TileLayer } from "react-leaflet";
import { MetroControlPane } from "../ControlPane/MetroControlPane";
// import Control from 'react-leaflet-control';
// import { Feature, Geometry, GeoJsonProperties, GeoJsonObject } from "geojson";
import { LatLngLiteral } from "leaflet";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import te from "react-intl/locale-data/te";
import hi from "react-intl/locale-data/hi";
import ur from "react-intl/locale-data/ur";

import { ActualLines } from "./ActualLinesWithPopups";
// import { ActualLines } from "./ActualLines";
import MetroSidebar from "../Sidebar/MetroSidebar";
import { ThemeContext } from "../../contexts/ThemeContext";
// types
import { StationInfo } from "../../types/MetroMapData";
import { DataFunctions } from "../../data/data_functions";
import messages from "../../i18n/messages";
import { flattenMessages } from "../../utils/flattenMessages";
addLocaleData([...en, ...te, ...hi, ...ur]);

const dataFunctions = new DataFunctions();
interface LineKey {
  color: string;
  key: string;
}

export interface Theme {
  theme_name: string;
  theme_value: string;
}
interface State {
  sidebar_collapsed: boolean;
  sidebar_selected: string;
  station_marker_radius: number;
  current_theme: Theme;
  line_keys: Array<LineKey>;
  position: LatLngLiteral;
  zoom: number;
  stations_on_line: Array<StationInfo>;
  current_language: string;
  selected_station: string;
}

const themes: Theme[] = [
  { theme_name: "light", theme_value: "openstreetmap.1b68f018" },
  { theme_name: "dark", theme_value: "mapbox.dark" }
];

export class MetroMap extends React.Component<{}, State> {
  public state: State = {
    sidebar_collapsed: false,
    sidebar_selected: "home",
    station_marker_radius: 8,
    current_theme: themes.filter(theme => theme.theme_name === "light")[0],
    line_keys: [
      { color: "red", key: "red-8" },
      { color: "blue", key: "blue-8" },
      { color: "green", key: "green-8" }
    ],
    position: { lat: 17.42271835184761, lng: 78.64974975585939 },
    zoom: 11,
    stations_on_line: [],
    current_language: "en",
    selected_station: ""
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
  };

  private zoomToLine = (line: string) => {
    this.setState(prevState => ({
      ...prevState,
      // position: {lat : 17.4241047, lng: 78.4570069},
      zoom: 12,
      stations_on_line: dataFunctions.getStationsOnLine(
        line,
        prevState.station_marker_radius
      )
    }));
  };

  private getLineInfo = (line: string) => {
    return {
      line_key: this.state.line_keys.filter(
        line_color => line_color.color === line
      )[0]["key"] as string,
      line_data: dataFunctions.getLineFilteredData(
        line,
        this.state.station_marker_radius
      )
    };
  };

  public handleLanguageChange = (e: React.SyntheticEvent) => {
    this.setState({ current_language: e.currentTarget.id });
  };
  public handleThemeChange = (e: React.SyntheticEvent) => {
    this.setState({
      current_theme: themes.filter(
        theme => theme.theme_name === e.currentTarget.id
      )[0]
    });
  };

  public highlightStation = (stationName: string) => {
    this.setState({ selected_station: stationName });
  };

  public render() {
    const { position, zoom } = this.state;
    return (
      <IntlProvider
        locale={this.state.current_language}
        messages={flattenMessages(messages[this.state.current_language])}
      >
        <ThemeContext.Provider value={this.state.current_theme.theme_name}>
          <React.StrictMode>
            <MetroSidebar
              updateStationRadius={this.updateStationRadius}
              zoomToLine={this.zoomToLine}
              stations_on_line={this.state.stations_on_line}
              current_theme={this.state.current_theme.theme_name}
              hightlightStation={this.highlightStation}
            />
            <Map
              center={position}
              zoom={zoom}
              ref={this.mapRef}
              zoomControl={false}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                id={this.state.current_theme.theme_value}
                url={`https://api.tiles.mapbox.com/v4/${
                  this.state.current_theme.theme_value
                }/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3NtLWluIiwiYSI6ImNqcnVxMTNrNTJwbHc0M250anUyOW81MjgifQ.cZnvZEyWT5AzNeO3ajg5tg`}
              />
              <MetroControlPane
                current_language={this.state.current_language}
                current_theme_name={this.state.current_theme.theme_name}
                handleLanguageChange={this.handleLanguageChange}
                handleThemeChange={this.handleThemeChange}
              />

              <ActualLines
                line_info={[this.getLineInfo("red"), this.getLineInfo("blue")]}
                selected_station={this.state.selected_station}
              />
            </Map>
          </React.StrictMode>
        </ThemeContext.Provider>
      </IntlProvider>
    );
  }
}
