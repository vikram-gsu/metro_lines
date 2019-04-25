import * as React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import {
  MetroStationsData,
  MetroStationsFeature
} from "../../types/MetroMapData";
import { ExtendedMarker } from "./ExtendedCircleMarker";

export interface ActualLinesProps {
  line_info: Array<{
    line_key: string;
    line_data: MetroStationsData;
  }>;
  selected_station: string;
  // getCircleMarker(feature:MetroStationsFeature, latlng:LatLngExpression):Layer
}

export const ActualLines = ({
  line_info,
  selected_station
}: ActualLinesProps) => {

  return (
    <>
      {line_info.map(({ line_key, line_data }) =>
        line_data.features.map(feature => {
          const [lng, lat] = feature.geometry.coordinates;
          const latlngCoords: LatLngExpression = { lat, lng };

          return (
            <CircleMarker
              center={latlngCoords}
              key={feature.properties.station_name}
              radius={feature.properties.station_radius}
              color={"#000"}
              fillColor={
                feature.properties.line_name.indexOf("/") === -1
                  ? feature.properties.line_name
                  : "yellow"
              }
              opacity={1}
              fillOpacity={0.8}
              weight={1}
            >
              <Popup>{feature.properties.station_name}</Popup>
            </CircleMarker>
          );
        })
      )}
    </>
  );
};
