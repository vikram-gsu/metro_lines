import * as React from "react";
import { CircleMarker } from "react-leaflet";

// Create your own class, extending from the Marker class.
export class ExtendedMarker extends (CircleMarker) {

  componentDidCatch(error:Error, info:React.ErrorInfo) {
    console.log(error);
  }
  // "Hijack" the component lifecycle.
  componentDidMount() {
    // Call the Marker class componentDidMount (to make sure everything behaves as normal)
      super.componentDidMount!();
      // Access the marker element and open the popup.
      this.leafletElement.openPopup();
  }
}
