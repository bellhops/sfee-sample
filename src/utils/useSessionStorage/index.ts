import { useCallback, useEffect, useMemo, useState } from 'react';
import { INITIAL_CUSTOMER_INFO } from '../../constants/booking';

/* eslint-disable-next-line no-unused-vars */
type StateResponse<T> = [T, (value: T) => void];

const useSessionStorage = <T>(key: string, initialValue: T = null): StateResponse<T> => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const deserialize = JSON.parse;
  const serialize = JSON.stringify;

  useEffect(() => {
    const item = sessionStorage.getItem(key);
    if (item) {
      setStoredValue(deserialize(item));
    } else {
      sessionStorage.setItem(key, serialize(INITIAL_CUSTOMER_INFO));
    }
  }, []);

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      sessionStorage.setItem(key, serialize(value));
    },
    [key, serialize],
  );

  return useMemo(() => [storedValue, setValue], [storedValue, setValue]);
};

export default useSessionStorage;
