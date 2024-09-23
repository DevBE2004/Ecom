import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the chart
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [3000, 5000, 4000, 7000, 6000, 8000, 10000],
        fill: true,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
        tension: 0.4,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue ($)',
        },
      },
    },
  };

  const handleUpdateData = () => {
    // Simulate dynamic data update
    const newData = {
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: data.datasets[0].data.map(value => value + Math.floor(Math.random() * 1000)), // Randomly increase each value
        },
      ],
    };
    setData(newData);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#c62828] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">$12,000</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
          <p className="text-3xl font-bold text-purple-600">80</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-600">5</p>
        </div>

        {/* Card 5 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">New Signups</h2>
          <p className="text-3xl font-bold text-teal-600">20</p>
        </div>

        {/* Card 6 */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold mb-2">Product Stock</h2>
          <p className="text-3xl font-bold text-red-600">30</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
        <Line data={data} options={options} />
        <button
          onClick={handleUpdateData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;