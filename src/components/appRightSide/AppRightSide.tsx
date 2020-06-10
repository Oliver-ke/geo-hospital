import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { Col } from 'antd'
import { locationContext } from '../../context/locationContext';
import getUserLocation from '../../utils/getUserLocation';

import Map from '../map/Map';

import './appRightSide.styles.scss';
const AppRightSide: FC = (): ReactElement => {
  const { dispatch } = useContext(locationContext)

  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      console.log(location)
      dispatch({ type: "SET_USER_LOCATION", payload: location });
    })()
  }, []);

  return (
    <Col className="app-right-side" xs={{ span: 5 }} md={{ span: 18 }}>
      <Map />
    </Col>
  )
}

export default AppRightSide;