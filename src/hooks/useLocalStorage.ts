import { useState } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item || '';
    } catch (error) {
      return initialValue;
    }
  });

  const setNewValue = (newValue: string | ((val: string) => string)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      // Save state
      setValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setNewValue] as const;
}

export default useLocalStorage;
