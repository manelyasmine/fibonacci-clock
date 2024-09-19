import { useState, useEffect } from 'react';

const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const incrementTime = (minutes) => {
    setTime(new Date(time.getTime() + minutes * 60000)); // Add or subtract minutes
  };

  return { time, incrementTime };
};

export default useTime;
