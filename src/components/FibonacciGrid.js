import React, { useState } from 'react';
import FibonacciSquare from './FibonacciSquare'; 
const fibonacciSequence = [1, 1, 2, 3, 5];   



const FibonacciGrid = () => {
  const [time, setTime] = useState(new Date());
  const [inputTime, setInputTime] = useState('');
  const [num, setNum] = useState(0); 
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
       
      const isBlockColor = hourBlocks.includes(index) && minuteBlocks.includes(index);
  
      if (isBlockColor) {
        return 'blue';
      } else if (hourBlocks.includes(index)) {
        return 'red';
      } else if (minuteBlocks.includes(index)) {
        return 'green';
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
     
       blocks.push(i);
        remaining -= fibonacciSequence[i];
      }
    } 

    return blocks;
  };  
   
  
  
  const colors = getFibonacciColors();
 
  const handleNextClick = (increment) => {
    const newTime = new Date(time); 
    newTime.setMinutes(time.getMinutes() + increment * 5);  
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center' }}>
        <FibonacciSquare value={fibonacciSequence[3]} color={colors[3]} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FibonacciSquare value={fibonacciSequence[2]} color={colors[2]} />
          <div>
            <FibonacciSquare value={fibonacciSequence[1]} color={colors[1]} />
            <FibonacciSquare value={fibonacciSequence[0]} color={colors[0]} />
          </div>
        </div>
      </div>
      <div>
        <FibonacciSquare value={fibonacciSequence[4]} color={colors[4]} />
      </div>
    </div>
    <div className="navigation-buttons">
      <button onClick={() => handleNextClick(-1)}>-5 Minutes</button>
      <button onClick={() => handleNextClick(1)}>+5 Minutes</button>
    </div>
  </div>
  );
};

export default FibonacciGrid;