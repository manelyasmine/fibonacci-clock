import React, { useState } from 'react';
 
const fibonacciSequence = [1, 1, 2, 3, 5]; // Fibonacci sequence with 5 elements
const maxFibonacciValue = Math.max(...fibonacciSequence);

const FibonacciSquare = ({ value, color }) => {
  return (
    <div
      className="fibonacci-square"
      style={{
        backgroundColor: color,
        width: `${value * 50}px`, // Adjust width multiplier for desired size
        height: `${value * 50}px`, // Adjust height multiplier for desired size
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      {value}
    </div>
  );
};

const FibonacciGrid = () => {
  const [time, setTime] = useState(new Date());
  const [inputTime, setInputTime] = useState('');

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleShowClick = () => {
    const [hours, minutes] = inputTime.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const updatedTime = new Date();
      updatedTime.setHours(hours);
      updatedTime.setMinutes(minutes);
      setTime(updatedTime);
    } else {
      alert('Please enter a valid time in HH:mm format.');
    }
  };

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getFibonacciColors = () => {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();

    const hourBlocks = calculateFibonacciBlocks(hours);
    const minuteBlocks = calculateFibonacciBlocks(Math.floor(minutes / 5));

    return fibonacciSequence.map((value, index) => {
      if (hourBlocks.includes(value) && minuteBlocks.includes(value)) {
        return 'green'; // You can change this color to your preference
      } else if (hourBlocks.includes(value)) {
        return 'red';
      } else if (minuteBlocks.includes(value)) {
        return 'blue';
      } else {
        return 'white';
      }
    });
  };

  const calculateFibonacciBlocks = (num) => {
    let blocks = [];
    let remaining = num;

    for (let i = fibonacciSequence.length - 1; i >= 0; i--) {
      if (fibonacciSequence[i] <= remaining) {
        blocks.push(fibonacciSequence[i]);
        remaining -= fibonacciSequence[i];
      }
    }

    return blocks;
  };

  const colors = getFibonacciColors();

  const handleNextClick = (increment) => {
    const newTime = new Date(time);
    newTime.setMinutes(time.getMinutes() + increment * 5); // Add or subtract 5 minutes
    setTime(newTime);
  };

  return (
    <div>
      <h1>Fibonacci Clock</h1>
      <div className="time-display">Current Time: {timeString}</div>
      <div className="time-input">
        <input
          type="text"
          placeholder="Enter time (HH:mm)"
          value={inputTime}
          onChange={handleInputChange}
        />
        <button onClick={handleShowClick}>Show</button>
      </div>
      <div className="fibonacci-grid" style={{ display: 'flex' }}>
  <div style={{ flex: 0, display: "flex", flexDirection: "column-reverse" }}>  {/* Left side column */}
    <FibonacciSquare value={fibonacciSequence[3]} color={colors[3]} />
    
    <div style={{ flex: 0, display: "flex", flexDirection: "row" }}>
    <FibonacciSquare value={fibonacciSequence[2]} color={colors[2]} />
    <div style={{ flex: 0, display: "flex", flexDirection: "column" }}>
   <FibonacciSquare value={fibonacciSequence[1]} color={colors[1]} />
   <FibonacciSquare value={fibonacciSequence[1]} color={colors[1]} />
   </div>
   </div>
  </div>
  <div style={{ flex: 6, display: "flex", flexDirection: "column" }}> {/* Right side column */}
    <FibonacciSquare value={fibonacciSequence[4]} color={colors[4]} />
  
  </div>
</div>
      <div className="navigation-buttons">
        <button onClick={() => handleNextClick(-1)}> -5 Minutes </button>
        <button onClick={() => handleNextClick(1)}> +5 Minutes </button>
      </div>
    </div>
  );
};

export default FibonacciGrid;