import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl, GeolocateControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MainGeoControl = () => {
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    marker: true,
    collapsed: true,
  });
  //Display the search functionnality on the map
  useControl(() => ctrl);

  // GeolocateControl: Mapbox method to geo track the user position
  return (
    <>
      <GeolocateControl trackUserLocation />
    </>
  );
};

export default MainGeoControl;

