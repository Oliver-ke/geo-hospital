import React, { FC, ReactElement, useState, useContext, useEffect } from 'react';
import { locationContext } from '../../context/locationContext';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import './map.styles.scss';

type keyType = string | any;
const key: keyType = process.env.REACT_APP_GOOGLE_MAP;

const Map: FC = (): ReactElement => {
  const { state } = useContext(locationContext);
  const { lat, lng, name } = state;
  const [center, setCenter] = useState({ lng, lat });
  const [zoom, setZoom] = useState(13);
  useEffect(() => {
    if (lat && lng) {
      setZoom(15);
      if (name === 'Your current location from IP') {
        setZoom(8);
      }
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
