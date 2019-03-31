import * as React from 'react';
import {Sidebar, Tab} from 'react-leaflet-sidebarv2';
import {Lines} from './MetroLines';

const metro_lines = ['red', 'green', 'blue'];

interface MetroSidebarProps {
  updateStationRadius(line:string, value: number):void
}

export const MetroSidebar = ({updateStationRadius}: MetroSidebarProps) => {
  return (
  <Sidebar id='sidebar' collapsed={false} selected={'home'}closeIcon='fa' position='right'>
    <Tab id='home' header='Home' icon='fa fa-home'>
      <Lines station_names={[]} line_names={metro_lines} onLineSelect={updateStationRadius} />
    </Tab>
    <Tab id='settings' header='Settings' icon='fa fa-cog' anchor='bottom'>
      No place like home!
    </Tab>
  </Sidebar>)
}
