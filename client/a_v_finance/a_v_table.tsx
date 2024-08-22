
import React from 'react';
import { StockDatatype } from './types';

interface Props {
  data: StockDatatype[];
}

const StockTable: React.FC<Props> = ({ data }) => {
  
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>; 
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Market Type</th>
          <th>Region</th>
          <th>Primary Exchanges</th>
          <th>Local Open</th>
          <th>Local Close</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock, ticker) => (
          <tr key={ticker}>
            <td>{stock.market_type}</td>
            <td>{stock.region}</td>
            <td>{stock.primary_exchanges}</td>
            <td>{stock.local_open}</td>
            <td>{stock.local_close}</td>
            <td>{stock.current_status}</td>
            <td>{stock.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
