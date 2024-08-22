import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../pages/LoginPage';
import SignIn from '../pages/SignUp';
import Dashboard from '../pages/dashboard';
import  StockData  from '../a_v_finance/a_v_axios';
import { RootState, AppDispatch } from '../services/store';
import { addComponent, removeComponent } from '../services/dashboardSlice';

const App: React.FC = () => {
  const components = useSelector((state: RootState) => state.dashboard.components);
  const dispatch: AppDispatch = useDispatch();

  const handleAddComponent = () => {
    dispatch(addComponent('newComponent'));
  };

  const handleRemoveComponent = () => {
    dispatch(removeComponent('oldComponent'));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashbourd" element = {<Dashboard/>}/>
        <Route 
          path="/home" 
          element={
            <div>
              <h1>Real-Time Stock Prices</h1>
              <StockData />
              <button onClick={handleAddComponent}>Add Component</button>
              <button onClick={handleRemoveComponent}>Remove Component</button>
              <div>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
