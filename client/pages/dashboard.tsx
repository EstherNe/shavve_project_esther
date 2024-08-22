
import React, { useState } from 'react';
import StockChart1 from '../a_v_monthly/StockChart';
import CryptoData from '../polygon/cryptoData';
import StockData from '../a_v_finance/a_v_axios'; 
import '../src/dashboard.css';

type ComponentType = 'CryptoData' | 'StockChart' | 'StockTable';

const Dashboard: React.FC = () => {
  const [components, setComponents] = useState<ComponentType[]>([]);

  const addComponent = (component: ComponentType) => {
    setComponents((prevComponents) => {
      if (!prevComponents.includes(component)) {
        return [...prevComponents, component];
      }
      return prevComponents;
    });
  };

  const removeComponent = (component: ComponentType) => {
    setComponents((prevComponents) => prevComponents.filter(c => c !== component));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Selected Components</h2>
        <ul>
          {components.map((component, index) => (
            <li key={index}>
              {component}
              <button onClick={() => removeComponent(component)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <h1>Mini Financial Dashboard</h1>
        <div className="button-container">
          <button onClick={() => addComponent('CryptoData')}>Add Cryptocurrency</button>
          <button onClick={() => addComponent('StockChart')}>Add Stock Chart</button>
          <button onClick={() => addComponent('StockTable')}>Add Stock Table</button>
        </div>
        <div className="components-container">
          {components.map((component, index) => {
            switch (component) {
              case 'CryptoData':
                return <div className="crypto-data-container" key={`cryptoData-${index}`}><CryptoData /></div>;
              case 'StockChart':
                return <div className="stock-chart-container" key={`stockChart-${index}`}><StockChart1 /></div>;
              case 'StockTable':
                return <div className="stock-table-container" key={`stockTable-${index}`}><StockData /></div>;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

