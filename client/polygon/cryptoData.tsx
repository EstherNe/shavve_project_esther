import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  active: boolean; 
  currency_symbol: string;
  currency_name: string;
  base_currency_symbol: string;
  base_currency_name: string;
  last_updated_utc: string;
}

const CryptoData: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/data/polygon', {
          params: {
            ticker: 'X:1INCHUSD',
          },
        });

        if (response.data && Array.isArray(response.data.results)) {
          setCryptoData(response.data.results);
        } else {
          throw new Error('Unexpected response format');
        }

      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(`API Error: ${error.message}`);
        } else if (error instanceof Error) {
          setError(`Unexpected Error: ${error.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Crypto Data</h1>
      {cryptoData.length > 0 ? (
        <div>
          {cryptoData.map((data) => (
            <div key={data.ticker}>
              <p><strong>Ticker:</strong> {data.ticker || 'N/A'}</p>
              <p><strong>Name:</strong> {data.name || 'N/A'}</p>
              <p><strong>Market:</strong> {data.market || 'N/A'}</p>
              <p><strong>Locale:</strong> {data.locale || 'N/A'}</p>
              <p><strong>Active:</strong> {data.active ? 'Yes' : 'No'}</p>
              <p><strong>Currency Symbol:</strong> {data.currency_symbol || 'N/A'}</p>
              <p><strong>Currency Name:</strong> {data.currency_name || 'N/A'}</p>
              <p><strong>Base Currency Symbol:</strong> {data.base_currency_symbol || 'N/A'}</p>
              <p><strong>Base Currency Name:</strong> {data.base_currency_name || 'N/A'}</p>
              <p><strong>Last Updated:</strong> {data.last_updated_utc ? new Date(data.last_updated_utc).toLocaleDateString() : 'N/A'}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CryptoData;
