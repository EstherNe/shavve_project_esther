

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockTable from './a_v_table';
import { StockResponse, StockDatatype } from './types';

const StockData: React.FC = () => {
  const [stocks, setStocks] = useState<StockDatatype[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<StockResponse>('http://localhost:3002/finance/stock');
        
        setStocks(response.data.markets || []);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      <StockTable data={stocks} />
    </div>
  );
};

export default StockData;
