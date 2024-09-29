import React from 'react';

const CustomTooltip = ({ active, payload, gasLabels }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow-lg rounded-lg text-gray-700 border border-gray-200">
        <p>
          <strong>Date:</strong> {new Date(payload[0].payload.date).toLocaleString()}
        </p>
        {payload.map((entry) => {
          let valueWithUnit;
          if (entry.name === 'N2O') valueWithUnit = `${entry.value} ppm`;
          if (entry.name === 'CH4') valueWithUnit = `${entry.value} ppm`;
          if (entry.name === 'CO2') valueWithUnit = `${entry.value} ppm`;
          if (entry.name === 'flowRate') valueWithUnit = `${entry.value} m³/h`;
          if (entry.name === 'temperature') valueWithUnit = `${entry.value} °C`;

          return (
            <p key={entry.name} style={{ color: entry.color }}>
              {gasLabels[entry.name]}: {valueWithUnit}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
