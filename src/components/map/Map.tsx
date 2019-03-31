import * as React from 'react';
import {IoIosHome} from 'react-icons/io';
import {Map, TileLayer, Marker, Popup, GeoJSON, CircleMarker, LatLngBounds, LatLng, Point, MapLayer} from 'react-leaflet';
import { Feature, Geometry, GeoJsonProperties, GeoJsonObject } from 'geojson';
import L, { LatLngLiteral } from 'leaflet';
import {Sidebar, Tab} from 'react-leaflet-sidebarv2';
import {Lines} from './Lines';

//types
import { Layer, LeafletEvent, LatLngExpression } from 'leaflet';
import {MetroStationsFeature, MetroStationsData} from './MapTypes';

//geojson data
const red_metro_stations:MetroStationsData = require('./data/red_metro_stations.json');
const blue_metro_stations:MetroStationsData = require('./data/blue_metro_stations.json');

const metro_lines = ['red', 'green', 'blue'];

export interface State {
  sidebar_collapsed: boolean,
  sidebar_selected: string,
  red_station_marker_radius: number,
  blue_station_marker_radius: number
}



export class PopupMarker extends React.Component<{}, State> {
  
  state:State = {
   sidebar_collapsed: false,
   sidebar_selected: 'home',
   red_station_marker_radius: 8,
   blue_station_marker_radius:8
  }
  mapRef:React.RefObject<any> = React.createRef()

  highlightFeature = (e:LeafletEvent) => {
    const layer:Layer = e.target;
    // console.log(layer);


  }

  resetHighlight = () => {

  }

  zoomToFeature = () => {

  }

  onEachFeature = (feature:Feature, layer:Layer) => {
    layer.on({
      'mouseover': this.highlightFeature,
      'mouseout': this.resetHighlight,
      'click': this.zoomToFeature
    })
  }

  getCircleMarker = (feature:MetroStationsFeature, latlng:LatLngExpression):Layer => {
    var geojsonMarkerOptions = {
      radius: feature.properties.line.indexOf('/') == -1? (feature.properties.line=='red'?this.state.red_station_marker_radius:this.state.blue_station_marker_radius): 9,
      fillColor: feature.properties.line.indexOf('/') == -1? feature.properties.line: 'yellow',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }

  onSidebarOpen = (id:string) => {
    this.setState({
      sidebar_collapsed: false,
      sidebar_selected: id
    })
  }

  onSidebarClose = () => {
    this.setState({
      sidebar_collapsed: true
    })
  }

  getLatLngCoordinatesForCircleMarker = (coordinates:number[]):LatLngExpression => {
    let [lng, lat] = coordinates
    return {lat, lng}
  }

  updateStationRadius = (line:string, value: number) => {
    this.setState(prevState => {
      return line=='red'?({...prevState, red_station_marker_radius : prevState.red_station_marker_radius + value}): ({...prevState, blue_station_marker_radius: prevState.blue_station_marker_radius + value})
    })
  }

  render() {
    const position = {lat: 17.42271835184761, lng: 78.64974975585939}
    return (
      <>
      <Sidebar id='sidebar' collapsed={this.state.sidebar_collapsed} selected={this.state.sidebar_selected}closeIcon='fa' position='right'>
          <Tab id='home' header='Home' icon='fa fa-home'>
            <Lines station_names={[]} line_names={metro_lines} onLineSelect={this.updateStationRadius} />
          </Tab>
          <Tab id='settings' header='Settings' icon='fa fa-cog' anchor='bottom'>
            No place like home!
          </Tab>
      </Sidebar>
      <Map center = {position} zoom={11} ref={this.mapRef}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          id= 'mapbox.light'
          url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxAccessToken}`}
        /> */}
        {/* {
          metro_stations.features.map((station) => (
            <CircleMarker center={this.getLatLngCoordinatesForCircleMarker(station.geometry.coordinates)} key={station.properties.name} radius = {8} color={'#000'} fillColor={'red'} opacity={1} fillOpacity={0.8} weight={1}>
              <Popup>
                {station.properties.name}
              </Popup>
            </CircleMarker>
          ))
        } */}

        

        {/* <GeoJSON data = {ts_boundary_polygon} 
                onEachFeature = {this.onEachFeature}/>
        
        <GeoJSON data = {public_transport_point}
                pointToLayer = {this.getCircleMarker} /> */}
        <GeoJSON key={this.state.red_station_marker_radius} data = {red_metro_stations as GeoJsonObject}
                pointToLayer = {this.getCircleMarker} />
        <GeoJSON key={this.state.blue_station_marker_radius} data = {blue_metro_stations as GeoJsonObject}
                pointToLayer = {this.getCircleMarker} />
      </Map>
    </>
    )
  }
}