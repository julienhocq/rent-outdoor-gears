import React, { useState } from "react";

// import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Map, { Marker, useControl } from "react-map-gl";
import GeocoderSearch from "./GeocoderSearch";

const Geocoder = () => {
  // const [marker, setMarker] = useState(null)

  const [viewport, setViewport] = useState({
    latitude: 45.463839,
    longitude: -73.577551,
    zoom: 10,
  });



  // function DrawControl(props: DrawControlProps) {
  //   useControl(() => new MapboxDraw(props), {
  //     position: props.position
  //   });
  
  //   return null;
  // }





  return (
    <>
      <Map
        {...viewport}
        style={{ width: 800, height: 400 }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {/* <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true
        }}
      /> */}
        {/* <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position="top-left" /> */}
        <GeocoderSearch />

        {/* {true && {
          setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }} */}

        {/* <Marker
          latitude={45.463839}
          longitude={-73.577551}
          color="red"
        ></Marker> */}
      </Map>
      {/* <ControlPanel /> */}
    </>
  );
};

export default Geocoder;
