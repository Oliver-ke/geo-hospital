import React, { useReducer } from 'react';
import AppLeftSide from './components/appLeftSide/AppLeftSide';
import AppRightSide from './components/appRightSide/AppRightSide';
import { Row } from 'antd';
import { locationContext, reducer, initialState } from './context/locationContext';
import './App.scss';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Row className="App">
      <locationContext.Provider value={{ state, dispatch }}>
        <AppLeftSide />
        <AppRightSide />
      </locationContext.Provider>
    </Row>
  );
}

export default App;
