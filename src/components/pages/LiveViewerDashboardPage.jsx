import React, { useState, useEffect } from 'react';

const LiveViewerDashboard = () => {
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState(['Device 1', 'Device 2', 'Device 3']);
  const [selectedDevice, setSelectedDevice] = useState('All');
  const [lastUpdate, setLastUpdate] = useState('');

  const generateRandomData = () => {
    const newData = {
      device: `Device ${Math.floor(Math.random() * 3) + 1}`,
      N2O: Math.random() * 50,
      CH4: Math.random() * 100,
      CO2: Math.random() * 20,
      flowRate: Math.random() * 5000,
      temperature: Math.random() * 100,
      date: new Date().toLocaleTimeString(),
    };
    return newData;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = generateRandomData();
      setData((prevData) => [...prevData, newEntry]);
      setLastUpdate(new Date().toLocaleTimeString());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredData =
    selectedDevice === 'All' ? data : data.filter((entry) => entry.device === selectedDevice);

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-8 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-500">Live Viewer Dashboard</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Select Device</label>
        <select
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900 bg-white"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}>
          <option value="All">All Devices</option>
          {devices.map((device) => (
            <option key={device} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Real-Time Data</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-gray-900">
            <thead>
              <tr>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">Device</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">N₂O (ppm)</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">CH₄ (ppm)</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">CO₂ (Vol.-%)</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">Flow Rate (m³/h)</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">Temperature (°C)</th>
                <th className="border px-2 sm:px-4 py-2 bg-gray-200">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-2 sm:px-4 py-2">{entry.device}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.N2O.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.CH4.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.CO2.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.flowRate.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.temperature.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-gray-600">
        <span>Last updated at: {lastUpdate}</span>
      </div>
    </div>
  );
};

export default LiveViewerDashboard;
