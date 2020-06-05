import React, { FC, ReactElement, useState, useContext, useEffect } from 'react';
import { locationContext } from '../../context/locationContext';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import './map.styles.scss';

type keyType = string | any;
const key: keyType = process.env.REACT_APP_GOOGLE_MAP;

const Map: FC = (): ReactElement => {
  const { state } = useContext(locationContext);
  const [center, setCenter] = useState({ lng: 3.5105, lat: 6.6194 });
  const [zoom, setZoom] = useState(13);
  const { lat, lng, name } = state;
  useEffect(() => {
    if (lat && lng) {
      setZoom(15);
      return setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        zoom={zoom}
        center={center}
      >
        {state.lng && (
          <Marker
            lat={center.lat}
            lng={center.lng}
            text={name}
          />
        )}
      </GoogleMapReact>
    </div>
  )
}

export default Map; 
