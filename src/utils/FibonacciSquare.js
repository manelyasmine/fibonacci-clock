import React from 'react';

const FibonacciSquare = ({ value, color }) => {
  return (
    <div className={`square ${color}`}>
      {value}
    </div>
  );
};

export default FibonacciSquare;
