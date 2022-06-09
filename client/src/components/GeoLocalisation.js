import React, { useState } from "react";

// import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Map, { Marker, useControl } from "react-map-gl";
import GeocoderSearch from "./GeocoderSearch";

const Geocoder = () => {
  // const [marker, setMarker] = useState(null)

  // function DrawControl(props: DrawControlProps) {
  //   useControl(() => new MapboxDraw(props), {
  //     position: props.position
  //   });

  //   return null;
  // }

  return (
    <>
      <Map
        initialViewState={{
          longitude: -73.577551,
          latitude: 45.463839,
          zoom: 11,
        }}
        style={{ width: 800, height: 400 }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeocoderSearch />
      </Map>
      {/* <ControlPanel /> */}
    </>
  );
};

export default Geocoder;
