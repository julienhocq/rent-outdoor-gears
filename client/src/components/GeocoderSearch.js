import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useState } from "react";

const GeocoderSearch = () => {
  const [marker, setMarker] = useState({
    longitude: -73.577551,
    latitude: 45.463839,
  });

  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    marker: true,
    collapsed: true,
  });
  useControl(() => ctrl);

  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    console.log("coords", coords);

    console.log("marker", marker);
    // setMarker({latitude: coords[0], longitude: coords[1]})
    // console.log("marker", marker);
  });

  console.log("marker.latitude", marker.longitude, marker.latitude);

  return (
    <>
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        draggable
        // trackUserLocation
        color="red"
      ></Marker>
    </>
  );
};

export default GeocoderSearch;
