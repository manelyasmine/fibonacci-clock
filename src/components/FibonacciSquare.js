import React from 'react';

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

export default FibonacciSquare;
