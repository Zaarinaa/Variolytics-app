import React, { useState, useEffect, useMemo } from 'react';
import Header from '../Header';
import StatCard from '../sections/StatCard';
import { Server, CloudRain, BarChart, Thermometer } from 'lucide-react';
import FilterSection from '../sections/FilterSection';
import GasToggles from '../sections/GasToggles';
import ChartSection from '../sections/ChartSection';

const gasLabels = {
  N2O: 'N₂O',
  CH4: 'CH₄',
  CO2: 'CO₂',
  flowRate: 'Flow Rate',
  temperature: 'Temperature',
};

const timeRanges = {
  morning: ['06:00', '12:00'],
  afternoon: ['12:00', '18:00'],
  evening: ['18:00', '00:00'],
  night: ['00:00', '06:00'],
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [aggregationInterval, setAggregationInterval] = useState('Daily');
  const [chartType, setChartType] = useState('line');
  const [showN2O, setShowN2O] = useState(true);
  const [showCH4, setShowCH4] = useState(true);
  const [showCO2, setShowCO2] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filterData = () => {
    let filtered = data;

    if (selectedDevice !== 'All') {
      filtered = filtered.filter((item) => item.device === selectedDevice);
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString(),
      );
    }

    if (selectedTimeRange) {
      const [startTime, endTime] = timeRanges[selectedTimeRange];
      filtered = filtered.filter((item) => {
        const time = new Date(item.date).toLocaleTimeString('en-GB');
        return time >= startTime && time <= endTime;
      });
    }

    if (filtered.length === 0) {
      setNoDataMessage('No data available for the selected filters.');
    } else {
      setNoDataMessage('');
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [selectedDevice, selectedDate, selectedTimeRange, data]);

  const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === 'line' ? 'scatter' : 'line'));
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lj:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard name="Total Gas Emissions" icon={CloudRain} value="1200 ppm" color="#8B5CF6" />
          <StatCard name="Total Active Devices" icon={Server} value="1,234" color="#6366F1" />
          <StatCard name="Average Flow Rate" icon={BarChart} value="450 m³/h" color="#EC4899" />
          <StatCard name="Average Temperature " icon={Thermometer} value="22°C" color="#10B981" />
        </div>

        <FilterSection
          aggregationInterval={aggregationInterval}
          setAggregationInterval={setAggregationInterval}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
        />

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={toggleChartType}
            className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
            Toggle to {chartType === 'line' ? 'Scatter Plot' : 'Line Chart'}
          </button>

          <GasToggles
            showN2O={showN2O}
            setShowN2O={setShowN2O}
            showCH4={showCH4}
            setShowCH4={setShowCH4}
            showCO2={showCO2}
            setShowCO2={setShowCO2}
          />
        </div>

        {noDataMessage && (
          <div className="p-4 mb-6 text-red-500 bg-red-100 rounded-lg">{noDataMessage}</div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ChartSection
            chartType={chartType}
            memoizedFilteredData={memoizedFilteredData}
            showN2O={showN2O}
            showCH4={showCH4}
            showCO2={showCO2}
            gasLabels={gasLabels}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
