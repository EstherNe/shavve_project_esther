import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/stocks'; 

export const fetchStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
