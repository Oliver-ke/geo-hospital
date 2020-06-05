import React, { FC, ReactElement } from 'react';
import { CompassTwoTone } from '@ant-design/icons'

import './header.styles.scss';
const Header: FC = (): ReactElement => {
  return (
    <div className="header">
      <h3>
        Ge<CompassTwoTone twoToneColor="#eb2f96" />Hospital
      </h3>
      <h4>Find nearest hospitals around your location</h4>
    </div>
  )
}

export default Header;