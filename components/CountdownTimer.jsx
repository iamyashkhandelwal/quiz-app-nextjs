import React, { useState, useEffect } from 'react';

function CountdownTimer({ time, onTimeout }) {
  const [seconds, setSeconds] = useState(time); // 30 minutes in seconds

  useEffect(() => {
    if (seconds >= 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      onTimeout?.();
    }
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span>
      {minutes < 10 ? '0' : ''}
      {minutes}:{remainingSeconds < 10 ? '0' : ''}
      {remainingSeconds}
    </span>
  );
}

export default CountdownTimer;