import * as React from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import { Lines } from "./MetroLines/MetroLines";

const metro_lines = ["red", "green", "blue"];

interface MetroSidebarProps {
  updateStationRadius(line:string, value: number):void;
  zoomToLine(line: string) : void;
  selected_station_info: {
    line_name: string;
    station_names: string[]
  };
}

export const MetroSidebar = ({updateStationRadius, zoomToLine, selected_station_info}: MetroSidebarProps) => {
  return (
  <Sidebar id="sidebar" collapsed={false} selected={"home"} closeIcon="fa" position="right">
    <Tab id="home" header="Home" icon="fa fa-home">
      <Lines selected_station_info={selected_station_info} line_names={metro_lines} onLineSelect={updateStationRadius} zoomToLine={zoomToLine}/>
    </Tab>
    <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
      No place like home!
    </Tab>
  </Sidebar>)
}
