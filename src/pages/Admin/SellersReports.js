import React, { useEffect, useState } from "react";

const dummyReports = [
  {
    id: 1,
    storeName: "TechZone",
    totalSales: 12000,
    profit: 3000,
    orders: 85,
    discounts: 500,
  },
  {
    id: 2,
    storeName: "BeautyWorld",
    totalSales: 8500,
    profit: 2200,
    orders: 60,
    discounts: 300,
  },
  {
    id: 3,
    storeName: "Fashionista",
    totalSales: 15300,
    profit: 4100,
    orders: 110,
    discounts: 720,
  },
];

const SellerReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    localStorage.setItem("sellerReports", JSON.stringify(dummyReports));
    const stored = JSON.parse(localStorage.getItem("sellerReports")) || [];
    setReports(stored);
  }, []);

  return (
    <div className="p-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-[#7a0d0d] mb-4">
        Sellers Reports
      </h2>

      {/* Filters */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded shadow">
          {/* Dropdown */}
          <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">From:</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">To:</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
            />
          </div>

          {/* Button */}
          <button className="bg-red-800 text-white px-5 py-2 rounded-full hover:bg-red-700 transition">
            View Report
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100 text-[#7a0d0d] text-sm font-semibold">
              <th className="px-4 py-3 border">Store Name</th>
              <th className="px-4 py-3 border">Total Sales</th>
              <th className="px-4 py-3 border">Profit</th>
              <th className="px-4 py-3 border">Orders</th>
              <th className="px-4 py-3 border">Total Discounts</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((store) => (
              <tr key={store.id} className="text-sm text-gray-700">
                <td className="px-4 py-3 border align-middle">{store.storeName}</td>
                <td className="px-4 py-3 border align-middle">${store.totalSales.toLocaleString()}</td>
                <td className="px-4 py-3 border align-middle">${store.profit.toLocaleString()}</td>
                <td className="px-4 py-3 border align-middle">{store.orders}</td>
                <td className="px-4 py-3 border align-middle">${store.discounts.toLocaleString()}</td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-gray-500 text-center text-sm"
                >
                  No reports available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerReports;
