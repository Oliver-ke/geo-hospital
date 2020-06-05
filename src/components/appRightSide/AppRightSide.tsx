import React, { FC, ReactElement } from 'react';
import { Col } from 'antd'

import Map from '../map/Map';

import './appRightSide.styles.scss';
const AppRightSide: FC = (): ReactElement => {
  return (
    <Col className="app-right-side" xs={{ span: 5 }} md={{ span: 18 }}>
      <Map />
    </Col>
  )
}

export default AppRightSide;