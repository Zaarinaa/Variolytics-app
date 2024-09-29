import React from 'react';

const GasToggles = ({ showN2O, setShowN2O, showCH4, setShowCH4, showCO2, setShowCO2 }) => (
  <div className="flex space-x-4 mb-6">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={showN2O}
        onChange={() => setShowN2O(!showN2O)}
        className="form-checkbox h-5 w-5 text-orange-500"
      />
      <span>N₂O</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={showCH4}
        onChange={() => setShowCH4(!showCH4)}
        className="form-checkbox h-5 w-5 text-green-500"
      />
      <span>CH₄</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={showCO2}
        onChange={() => setShowCO2(!showCO2)}
        className="form-checkbox h-5 w-5 text-blue-500"
      />
      <span>CO₂</span>
    </label>
  </div>
);

export default GasToggles;
