import * as React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { MetroStationsData, MetroStationsFeature } from "../../types/MetroMap";

export interface ActualLinesProps {
  line_info: Array<{
    line_key: string;
    line_data: MetroStationsData;
  }>;
  // getCircleMarker(feature:MetroStationsFeature, latlng:LatLngExpression):Layer
}

export const ActualLines = ({ line_info }: ActualLinesProps) => {
  return (
    <>
      {line_info.map(({ line_key, line_data }) =>
        line_data.features.map(feature => {
          const [lng, lat] = feature.geometry.coordinates;
          const latlngCoords: LatLngExpression = { lat, lng };

          return (
            <CircleMarker
              center={latlngCoords}
              key={feature.properties.name}
              radius={feature.properties.station_radius}
              color={"#000"}
              fillColor={
                feature.properties.line.indexOf("/") === -1
                  ? feature.properties.line
                  : "yellow"
              }
              opacity={1}
              fillOpacity={0.8}
              weight={1}
            >
              <Popup>{feature.properties.name}</Popup>
            </CircleMarker>
          );
        })
      )}
    </>
  );
};
