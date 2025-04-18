import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

interface SalesData {
  date: string;
  total_sales: number;
}

const SalesAnalytics: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    api.get('/sales')
      .then((response) => {
        setSalesData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching sales data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded shadow text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded shadow text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sales Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px', border: '1px solid #ccc' }} />
          <Line type="monotone" dataKey="total_sales" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics;
