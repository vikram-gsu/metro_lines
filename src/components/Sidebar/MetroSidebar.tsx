import * as React from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import { Lines } from "./MetroLines/MetroLines";
import { StationInfo } from "../../types/MetroMapData";

const metro_lines = ["red", "green", "blue"];

interface MetroSidebarProps {
  updateStationRadius(line: string, value: number): void;
  zoomToLine(line: string): void;
  stations_on_line: Array<StationInfo>;
  current_theme: string;
}

export const MetroSidebar = ({
  updateStationRadius,
  zoomToLine,
  stations_on_line,
  current_theme
}: MetroSidebarProps) => {
  return (
    <Sidebar
      id="sidebar"
      collapsed={false}
      selected={"home"}
      closeIcon="fa"
      position="right"
    >
      <Tab id="home" header="Home" icon="fa fa-home">
        {current_theme}
        <Lines
          stations_on_line={stations_on_line}
          line_names={metro_lines}
          onLineSelect={updateStationRadius}
          zoomToLine={zoomToLine}
        />
      </Tab>
      <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
        No place like home!
      </Tab>
    </Sidebar>
  );
};
