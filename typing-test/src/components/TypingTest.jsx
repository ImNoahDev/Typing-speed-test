// src/components/TypingTest.jsx
import React, { useState, useEffect } from 'react';

const sampleText = "The quick brown fox jumps over the lazy dog";

const TypingTest = () => {
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval;
    if (input.length === 0) {
      setStartTime(null);
      setElapsedTime(0);
    } else if (!isComplete) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      interval = setInterval(() => {
        setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
      }, 100);
    }

    if (input === sampleText) {
      setIsComplete(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [input, startTime, isComplete]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length >= 10) {
        setIsComplete(true);
    }

    const correctCount = value.split('').filter((char, index) => char === sampleText[index]).length;
    setCorrect(correctCount);
    setIncorrect(value.length - correctCount);
  };

  const calculateAccuracy = () => {
    if (input.length === 0) return 0;
    return ((correct / input.length) * 100).toFixed(2);
  };

  const calculateWPM = () => {
    if (elapsedTime === 0) return 0;
    const wordsTyped = input.split(' ').length;
    const minutesElapsed = elapsedTime / 60;
    return (wordsTyped / minutesElapsed).toFixed(2);
  };

  const renderText = () => {
    return sampleText.split('').map((char, index) => {
      const color = index < input.length ? (char === input[index] ? 'text-green-500' : 'text-red-500') : 'text-gray-500';
      return <span key={index} className={color}>{char}</span>;
    });
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="text-2xl mb-4">{renderText()}</div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border p-2 text-xl"
        placeholder="Start typing..."
      />
      <div className="mt-4">
        <p>Correct: <span className="text-green-500">{correct}</span></p>
        <p>Incorrect: <span className="text-red-500">{incorrect}</span></p>
        <p>Time: <span>{elapsedTime}s</span></p>
        <p>Accuracy: <span>{calculateAccuracy()}%</span></p>
        <p>WPM: <span>{calculateWPM()}</span></p>
      </div>
    </div>
  );
};

export default TypingTest;
