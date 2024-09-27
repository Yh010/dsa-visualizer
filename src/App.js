// src/App.js
import React, { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import ArrayInput from './components/ArrayInput';
import Visualizer from './components/Visualizer';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('mergeSort');
  const [array, setArray] = useState([10, 3, 15, 7, 8, 23, 74]);

  return (
    <div className="App">
      <h1>Algorithm Visualizer</h1>
      <AlgorithmSelector onSelectAlgorithm={setSelectedAlgorithm} />
      <ArrayInput onArraySubmit={setArray} />
      <Visualizer array={array} algorithm={selectedAlgorithm} />
    </div>
  );
}

export default App;
