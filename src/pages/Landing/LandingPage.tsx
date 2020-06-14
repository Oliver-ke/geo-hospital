import React, { FC, ReactElement, useEffect } from 'react';
import { Button } from 'antd'
import { useAuth0 } from '../../context/authContext'
import appLogo from '../../assets/logo.png';

import './landing.styles.scss';
type history = {
  push: Function
}
interface ILandingPage {
  history: history
}

const LandingPage: FC<ILandingPage> = ({ history }): ReactElement => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/app')
    }
  }, [isAuthenticated])
  return (
    <div className="landing-wrapper">
      <div className="content">
        <img src={appLogo} alt="logo" />
        <h3>Welcome!</h3>
        <h4>Authentication required, please Authenticate</h4>
        <Button onClick={() => loginWithRedirect()} className="auth-btn">
          Proceed to Authorization page
        </Button>
      </div>
    </div>
  )
}

export default LandingPage;