import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const GeocoderSearch = () => {
    // const { dispatch } = useValue();
    const ctrl = new MapBoxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      marker: true,
      collapsed: true,
    });
    useControl(() => ctrl);

    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      console.log('coords', coords);
    //   dispatch({
    //     type: 'UPDATE_LOCATION',
    //     payload: { lng: coords[0], lat: coords[1] },
    //   });
    });
    return null;
  };
  
  export default GeocoderSearch;
  