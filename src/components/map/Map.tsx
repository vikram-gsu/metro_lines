import * as React from 'react';
import {Map, TileLayer, Marker, Popup, GeoJSON, CircleMarker, LatLngBounds, LatLng, Point, MapLayer} from 'react-leaflet';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { Layer, LeafletEvent, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import L from 'leaflet';
const ts_boundary_polygon = require('./data/boundary-polygon.json');
const public_transport_point = require('./data/public-transport-point.json');
const metro_stations = require('./data/metro_stations.json');

export interface State {
  zoom: number
}

export class PopupMarker extends React.Component<{}, State> {
  
  state:State = {
   zoom: 11
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

  getCircleMarker = (feature:Feature<any, any>, latlng:LatLngExpression):Layer => {
    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "red",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }



  render() {
    const position = {lat: 17.416159, lng: 78.439879}
    return (
      <Map center = {position} zoom={this.state.zoom} ref={this.mapRef}>
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
          redLine.map(station => (
            <CircleMarker center={station.coordinates} key={station.name} radius = {8} color={'#000'} fillColor={'red'} opacity={1} fillOpacity={0.8} weight={1}>
              <Popup>
                {station.name}
              </Popup>
            </CircleMarker>
          ))
        } */}

        

        {/* <GeoJSON data = {ts_boundary_polygon} 
                onEachFeature = {this.onEachFeature}/>
        
        <GeoJSON data = {public_transport_point}
                pointToLayer = {this.getCircleMarker} /> */}
        <GeoJSON data = {metro_stations}
                pointToLayer = {this.getCircleMarker} />
      </Map>
    )
  }
}