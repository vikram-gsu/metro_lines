export interface StationInfo {
  "name": string,
  "station": "normal"|"connecting",
  "line": "red"|"red/blue"|"red/green" | "blue"| "green",
  "mmts_connection": boolean,
  "rail_connection": boolean,
  "bus_connection": boolean,
  "parking": "additional"|"street"|"none",
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