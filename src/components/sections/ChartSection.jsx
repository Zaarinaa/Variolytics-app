import React from 'react';
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartSection = ({
  chartType,
  memoizedFilteredData,
  showN2O,
  showCH4,
  showCO2,
  gasLabels,
}) => (
  <ResponsiveContainer width="100%" height={400}>
    {chartType === 'line' ? (
      <LineChart data={memoizedFilteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip gasLabels={gasLabels} />} />
        <Legend />
        {showN2O && <Line type="monotone" dataKey="N2O" stroke="orange" />}
        {showCH4 && <Line type="monotone" dataKey="CH4" stroke="green" />}
        {showCO2 && <Line type="monotone" dataKey="CO2" stroke="blue" />}
      </LineChart>
    ) : (
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip gasLabels={gasLabels} />} />
        <Legend />
        {showN2O && (
          <Scatter name={gasLabels.N2O} data={memoizedFilteredData} dataKey="N2O" fill="orange" />
        )}
        {showCH4 && (
          <Scatter name={gasLabels.CH4} data={memoizedFilteredData} dataKey="CH4" fill="green" />
        )}
        {showCO2 && (
          <Scatter name={gasLabels.CO2} data={memoizedFilteredData} dataKey="CO2" fill="blue" />
        )}
      </ScatterChart>
    )}
  </ResponsiveContainer>
);

export default ChartSection;
