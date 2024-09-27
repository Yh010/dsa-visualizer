import React, { useState, useEffect, useRef } from 'react';
import './Visualizer.css';
import { mergeSort } from '../algorithms/mergeSort';

const Visualizer = ({ array, algorithm }) => {
  const [currentArray, setCurrentArray] = useState([...array]);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [operation, setOperation] = useState('');
  const intervalRef = useRef(null);

  // Start Merge Sort or other algorithms
  useEffect(() => {
    if (algorithm === 'mergeSort') {
      const animations = [];
      mergeSort(array, animations);
      setAnimationSteps(animations);
      setCurrentStep(0); // Reset to the first step
    }
  }, [array, algorithm]);

  // Play the animation step-by-step
  useEffect(() => {
    if (isPlaying && currentStep < animationSteps.length) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prevStep => prevStep + 1);
      }, 1000); // Increase delay for better observation
    }
    return () => clearInterval(intervalRef.current); // Clean up on unmount
  }, [isPlaying, currentStep, animationSteps.length]);

  // Stop the animation when reaching the last step
  useEffect(() => {
    if (currentStep >= animationSteps.length) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else if (currentStep >= 0) {
      setCurrentArray(animationSteps[currentStep].array);
      setOperation(animationSteps[currentStep].operation);
    }
  }, [currentStep, animationSteps]);

  // Handle manual stepping
  const handleStep = (step) => {
    const newStep = Math.min(Math.max(currentStep + step, 0), animationSteps.length - 1);
    setCurrentStep(newStep);
    setCurrentArray(animationSteps[newStep]?.array || []);
    setOperation(animationSteps[newStep]?.operation || '');
  };

  return (
    <div className="visualizer-container">
      <div className="array-container">
        {currentArray.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${animationSteps[currentStep]?.highlight.includes(idx) ? 'merge' : ''} ${animationSteps[currentStep]?.active.includes(idx) ? 'compare' : ''}`}
            style={{ height: `${value * 10}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => handleStep(-1)} disabled={currentStep <= 0}>Previous</button>
        <button onClick={() => handleStep(1)} disabled={currentStep >= animationSteps.length - 1}>Next</button>
      </div>
      <div className="operation-display">Operation: {operation}</div>
    </div>
  );
};

export default Visualizer;
