import React, { useState } from 'react';

const ManageOrder = () => {
  const [orders, setOrders] = useState([
    { id: '#12345', customer: 'John Doe', date: '01/01/2024', total: '$100.00', status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', date: '01/02/2024', total: '$150.00', status: 'Pending' },
    { id: '#12347', customer: 'Alice Johnson', date: '01/03/2024', total: '$200.00', status: 'Shipped' },
    { id: '#12348', customer: 'Bob Brown', date: '01/04/2024', total: '$250.00', status: 'Completed' },
    { id: '#12349', customer: 'Charlie Black', date: '01/05/2024', total: '$300.00', status: 'Cancelled' },
  ]);

  const handleView = (orderId) => {
    alert(`Viewing details for order ${orderId}`);
  };

  const handleDelete = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#c62828] mb-8">Manage Orders</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Search Orders..."
            className="border rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#c62828] transition"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer Name</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Total Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.total}</td>
                <td className={`p-4 ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status}
                </td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline" onClick={() => handleView(order.id)}>View</button>
                  <button className="text-red-500 hover:underline ml-4" onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ManageOrder;