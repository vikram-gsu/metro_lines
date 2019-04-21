import * as React from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import {injectIntl, InjectedIntl} from 'react-intl';
import { Lines } from "./MetroLines/MetroLines";
import { StationInfo } from "../../types/MetroMapData";
import {ThemeContext} from '../../contexts/ThemeContext';
import { ThemedSidebar } from './ThemedSidebar';
import { ThemedTab } from './ThemedTab';
const metro_lines = ["red", "green", "blue"];

interface MetroSidebarProps {
  intl: InjectedIntl;
  updateStationRadius(line: string, value: number): void;
  zoomToLine(line: string): void;
  stations_on_line: Array<StationInfo>;
  current_theme: string;
  hightlightStation(stationName:string): void;
}

const MetroSidebar = ({
  intl,
  updateStationRadius,
  zoomToLine,
  stations_on_line,
  current_theme,
  hightlightStation
}: MetroSidebarProps) => {
  return (
    <ThemedSidebar
      id="sidebar"
      collapsed={false}
      selected={"home"}
      closeIcon="fa"
      position="right"
    >
      <Tab id="home" header={intl.formatMessage({id: "home"})} icon="fa fa-home">
        <Lines
          stations_on_line={stations_on_line}
          line_names={metro_lines}
          onLineSelect={updateStationRadius}
          zoomToLine={zoomToLine}
          highlightStation={hightlightStation}
        />
      </Tab>
      <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
        No place like home!
      </Tab>
    </ThemedSidebar>
  );
};

export default injectIntl(MetroSidebar);
