import { useState } from 'react';

const useInput = () => {
  // state
  const [value, setValue] = useState('');

  // handler
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return [value, handler];
};

export default useInput;
