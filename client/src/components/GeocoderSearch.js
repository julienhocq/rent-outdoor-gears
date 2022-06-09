import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl, GeolocateControl } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css'
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
    const coordinatesSearch = e.result.geometry.coordinates;
    console.log("coordinatesSearch", coordinatesSearch);

    console.log("marker initial state", marker);
    setMarker({
      longitude: coordinatesSearch[0],
      latitude: coordinatesSearch[1],
    });
    // console.log("marker", marker);
  });

  console.log("marker updated - object:", marker);
  console.log("marker updated lgt / lat:", marker.longitude, marker.latitude);

  return (
    <>
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        draggable
        color="red"
        onDragEnd={(e) =>
          //  console.log('e', e.lngLat.lng)
          setMarker({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
          })
        }
      />

      {/* <GeolocateControl
        trackUserLocation
        onGeolocate={(e) =>
          setMarker({
            longitude: e.coords.longitude,
            latitude: e.coords.latitude,
          })

        }
      /> */}
    </>
  );
};

export default GeocoderSearch;

// Marker
// GeolocateControl: Mapbox method to geo tracked the user
