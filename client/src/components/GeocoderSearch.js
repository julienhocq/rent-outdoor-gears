import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl, GeolocateControl } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css'
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useContext, useEffect, useState } from "react";
import { OwnerContext } from "./context/Context";

const GeocoderSearch = () => {
const {markerNewItem, setMarkerNewItem} = useContext(OwnerContext)


  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    marker: true,
    collapsed: true,
  });
  //Display the search functionnality on the map
  useControl(() => ctrl);

  //Move the marker when search is triggered
  ctrl.on("result", (e) => {
    const coordinatesSearch = e.result.geometry.coordinates;

    // console.log("position initial is", markerNewItem);
    setMarkerNewItem({
      longitude: coordinatesSearch[0],
      latitude: coordinatesSearch[1],
    });
    // console.log("marker", marker);
  });

  console.log("position object:", markerNewItem);
  console.log("position updated lgt / lat:", markerNewItem.longitude, markerNewItem.latitude);

  return (
    <>
      <Marker
        longitude={markerNewItem.longitude}
        latitude={markerNewItem.latitude}
        draggable
        color="red"
        onDragEnd={(e) =>
          //  console.log('e', e.lngLat.lng)
          setMarkerNewItem({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
          })
        }
      />

      {/* <GeolocateControl
        trackUserLocation
        onGeolocate={(e) =>
          setMarkerNewItem({
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
