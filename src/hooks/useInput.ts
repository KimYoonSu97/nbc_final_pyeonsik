import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return [value, handler];
};

export default useInput;
