import { GeoJsonObject } from "geojson";
import L from "leaflet";
import { LatLngExpression, Layer } from "leaflet";
import { MetroStationsData, MetroStationsFeature } from "./MetroMap.d";
import * as React from "react";
import { GeoJSON } from "react-leaflet";

export interface ActualLinesProps {
  line_info: Array<{
                    line_key: string,
                    line_data: MetroStationsData,
                  }>;
  // getCircleMarker(feature:MetroStationsFeature, latlng:LatLngExpression):Layer
}

export const ActualLines = ({line_info}: ActualLinesProps) => {
  const getCircleMarker = ( feature: MetroStationsFeature, latlng: LatLngExpression ): Layer => {
    const geojsonMarkerOptions = {
      radius: feature.properties.station_radius,
      fillColor: feature.properties.line.indexOf("/") === -1 ? feature.properties.line: "yellow",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
    return L.circleMarker(latlng, geojsonMarkerOptions);
  };

  return (
    <>
    {line_info.map(({line_key, line_data}) =>
      <GeoJSON key={line_key} data = {line_data as GeoJsonObject}
      pointToLayer = {getCircleMarker} />
    )}
    </>
  );
};