import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useState } from "react";

const GeocoderSearch = () => {

  const [marker, setMarker] = useState({
    latitude: 45.463839,
    longitude: -73.577551,
  });

  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    marker: true,
    collapsed: true,
  });
  useControl(() => ctrl);
useEffect(() => {
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    console.log("coords", coords);

    console.log("marker", marker);
    // setMarker({latitude: coords[0], longitude: coords[1]})
    // console.log("marker", marker);
    
  });

}, [ctrl, marker])

  console.log('marker.latitude', marker.latitude, marker.longitude);

  return (
    <>
      <Marker  longitude={marker.longitude} latitude={marker.latitude} color="red"></Marker>
    </>
  );
};

export default GeocoderSearch;
