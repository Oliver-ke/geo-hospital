import React, { FC, ReactElement, useContext } from 'react';
import { locationContext } from '../../context/locationContext';
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
  geometry: geometryType,
  vicinity: string | undefined
}
interface Icard {
  hospital: hospitalType
}

const Card: FC<Icard> = ({ hospital }): ReactElement => {
  const { dispatch, state } = useContext(locationContext)
  const { lat } = state;
  const { name, formatted_address, vicinity, geometry: { location } } = hospital;
  return (
    <div
      onClick={() => dispatch({ type: "CARD_SELECTED", payload: { ...location, name } })}
      className={lat === location.lat ? "card active" : "card"}
    >
      <img src={hospitalImg} alt="icon" />
      <div className="place-detail">
        <h3>{name}</h3>
        <p>{formatted_address ? formatted_address : vicinity}</p>
      </div>
    </div>
  )
}

export default Card;