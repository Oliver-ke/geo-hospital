import React, { FC, ReactElement } from 'react';
import markerImg from '../../assets/marker.png';


type mackerProps = {
  lat: number,
  lng: number,
  text: string
}

const Marker: FC<mackerProps> = ({ lat, lng, text }): ReactElement => {
  return (
    <div className="marker">
      <div className="description">
        <h4>{text}</h4>
      </div>
      <img src={markerImg} alt="marker" />
    </div>
  )
}

export default Marker;