import React, { FC, ReactElement, useContext } from 'react';
import { LocationContex } from '../../context/locationContext';
import hospitalImg from '../../assets/hospital.png'

import './card.styles.scss';
type locationType = {
  lat: number,
  lng: number
}

type geometryType = {
  location: locationType
}
type hospitalType = {
  name: string,
  formatted_address: string,
  geometry: geometryType
}
interface Icard {
  hospital: hospitalType
}

const Card: FC<Icard> = ({ hospital }): ReactElement => {
  const { dispatch, state } = useContext(LocationContex)
  const { lat } = state;
  const { name, formatted_address, geometry: { location } } = hospital;
  return (
    <div
      onClick={() => dispatch({ type: "CARD_SELECTED", payload: { ...location, name } })}
      className={lat === location.lat ? "card active" : "card"}
    >
      <img src={hospitalImg} alt="icon" />
      <div className="place-detail">
        <h3>{name}</h3>
        <p>{formatted_address}</p>
      </div>
    </div>
  )
}

export default Card;