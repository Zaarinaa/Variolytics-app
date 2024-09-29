import React from 'react';

const FilterSection = ({
  aggregationInterval,
  setAggregationInterval,
  selectedDevice,
  setSelectedDevice,
  selectedDate,
  setSelectedDate,
  selectedTimeRange,
  setSelectedTimeRange,
}) => (
  <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
      <label className="block mb-2 font-medium text-gray-700">Aggregation Interval</label>
      <select
        className="w-full p-3 border border-gray-400 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
        value={aggregationInterval}
        onChange={(e) => setAggregationInterval(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">Device</label>
      <select
        className="w-full p-3 border border-gray-400 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}>
        <option value="All">All Devices</option>
        <option value="Device 1">Device 1</option>
        <option value="Device 2">Device 2</option>
        <option value="Device 3">Device 3</option>
      </select>
    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">Date</label>
      <input
        type="date"
        className="w-full p-3 border border-gray-400 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">Time Range</label>
      <select
        className="w-full p-3 border border-gray-400 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
        value={selectedTimeRange}
        onChange={(e) => setSelectedTimeRange(e.target.value)}>
        <option value="">All Day</option>
        <option value="morning">Morning (06:00 - 12:00)</option>
        <option value="afternoon">Afternoon (12:00 - 18:00)</option>
        <option value="evening">Evening (18:00 - 00:00)</option>
        <option value="night">Night (00:00 - 06:00)</option>
      </select>
    </div>
  </div>
);

export default FilterSection;
