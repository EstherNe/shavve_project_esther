import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StockData {
    toDate:string;
    fromDate:string;
    range:string;
    ticker:string;
}

const StockComponent: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<StockData[]>('http://localhost:3002/data/polygon'

, {
      params: {
        ticker: 'AAPL',  
        range: '1d',    
        fromDate: '2024-01-01', 
        toDate: '2024-01-31'  
      }
  }



        ); 
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.ticker}>
            {stock.ticker}: ${stock.range}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockComponent;
