// src/components/AlgorithmSelector.js
import React from 'react';

const AlgorithmSelector = ({ onSelectAlgorithm }) => {
  return (
    <select onChange={e => onSelectAlgorithm(e.target.value)}>
      <option value="mergeSort">Merge Sort</option>
      <option value="quickSort">Quick Sort</option>
      {/* Add more algorithms here */}
    </select>
  );
};

export default AlgorithmSelector;
