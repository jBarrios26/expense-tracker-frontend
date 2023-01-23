import React, { useEffect, useState } from 'react';

export function useSnackbar(timeMs: number) {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [intervalId, setIntervalId] = useState<number | undefined>();

  useEffect(() => {
    if (isActive === true) {
      setIntervalId(
        setTimeout(() => {
          setIsActive(false);
        }, timeMs)
      );
    }
  }, [isActive, timeMs]);

  const openSnackBar = (msg = 'Something went wrong...') => {
    setMessage(msg);
    setIsActive(true);
  };

  const closeSnackBar = () => {
    clearInterval(intervalId);
    setMessage('');
    setIsActive(false);
  };

  return { isActive, message, openSnackBar, closeSnackBar };
}
