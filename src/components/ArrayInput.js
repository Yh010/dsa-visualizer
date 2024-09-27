// src/components/ArrayInput.js
import React, { useState } from 'react';

const ArrayInput = ({ onArraySubmit }) => {
  const [inputArray, setInputArray] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const array = inputArray.split(',').map(num => parseInt(num, 10));
    onArraySubmit(array);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputArray}
        onChange={e => setInputArray(e.target.value)}
        placeholder="Enter numbers separated by commas"
      />
      <button type="submit">Visualize</button>
    </form>
  );
};

export default ArrayInput;
