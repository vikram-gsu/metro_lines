export interface MetroStationsFeature {
  type: string,
  properties: {
    "name": string,
    "station": "normal"|"connecting",
    "line": "red"|"red/blue"|"red/green",
    "mmts_connection": boolean,
    "rail_connection": boolean,
    "bus_connection": boolean,
    "parking": "additional"|"street"|"none"
  },
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