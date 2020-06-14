import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { Col } from 'antd'
import { locationContext } from '../../context/locationContext';
import getUserLocation from '../../utils/getUserLocation';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth0 } from '../../context/authContext'
import Map from '../map/Map';

import './appRightSide.styles.scss';
const AppRightSide: FC = (): ReactElement => {
  const { dispatch } = useContext(locationContext);
  const { logout, user } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const location = await getUserLocation();
        dispatch({ type: "SET_USER_LOCATION", payload: location });
      } catch (error) {
        alert("Get current location error, try using a Chrome browser")
      }
    })()
  }, []);

  return (
    <Col className="app-right-side" xs={{ span: 5 }} md={{ span: 18 }}>
      <Map />
      <div className="logout-btn-container">
        <Button onClick={() => logout()} icon={<LogoutOutlined />} className="logout-btn">
          Log out <span className="email"> - {user.email}</span>
        </Button>
      </div>
    </Col>
  )
}

export default AppRightSide;