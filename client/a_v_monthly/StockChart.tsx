import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface StockData {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Time Zone': string;
  };
  'Monthly Time Series': {
    [date: string]: MonthlyData;
  };
}

interface StockChartData {
  [symbol: string]: StockData;
}

const StockChart1: React.FC = () => {
  const [stockChartData, setStockChartData] = useState<StockChartData | null>(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.post('http://localhost:3002/finance/monthly', {
          symbols: ['IBM', 'AAPL'],
        });

        const formattedData: StockChartData = response.data.reduce((acc: StockChartData, item: any) => {
          acc[item.symbol] = item.data;
          return acc;
        }, {});
        console.log('Fetched data:', formattedData);
        setStockChartData(formattedData);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };

    fetchMonthlyData();
  }, []);

  const formattedData = stockChartData
    ? Object.keys(stockChartData).flatMap(symbol => {
        const data = stockChartData[symbol]['Monthly Time Series'];
        return Object.keys(data).map(date => ({
          symbol,
          date: new Date(date),
          open: parseFloat(data[date]['1. open']),
          high: parseFloat(data[date]['2. high']),
          low: parseFloat(data[date]['3. low']),
          close: parseFloat(data[date]['4. close']),
          volume: parseFloat(data[date]['5. volume']),
        }));
      })
    : [];

  const chartData: ChartData<'line'> = {
    labels: formattedData.map(d => d.date),
    datasets: formattedData.reduce((datasets: any[], dataPoint) => {
      const existingDataset = datasets.find(d => d.label === `${dataPoint.symbol} Close Price`);
      if (!existingDataset) {
        datasets.push({
          label: `${dataPoint.symbol} Close Price`,
          data: formattedData.filter(d => d.symbol === dataPoint.symbol).map(d => ({ x: d.date, y: d.close })),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        });
        datasets.push({
          label: `${dataPoint.symbol} Open Price`,
          data: formattedData.filter(d => d.symbol === dataPoint.symbol).map(d => ({ x: d.date, y: d.open })),
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
          tension: 0.1,
        });
      }
      return datasets;
    }, []),
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Price: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart1;
