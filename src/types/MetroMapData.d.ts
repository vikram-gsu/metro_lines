export interface StationInfo {
  "station_name": string,
  "station_type": "normal"|"connecting",
  "line_name": "red"|"red/blue"|"red/green" | "blue"| "green",
  "mmts_connection": boolean,
  "rail_connection": boolean,
  "bus_connection": boolean,
  "parking_type": "additional"|"street"|"none",
  "station_radius": number
}

export interface MetroStationsFeature {
  type: string,
  properties: StationInfo,
  geometry: {
    type: 'Point' | 'Polygon',
    coordinates: number[]
  }
}
export interface MetroStationsData {
  type: string,
  name: string,
  features: MetroStationsFeature[]
}