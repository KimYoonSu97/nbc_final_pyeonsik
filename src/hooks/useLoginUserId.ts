import { useEffect, useMemo, useState } from 'react';

const useLoginUserId = () => {
  const [loginUserId, setLoginUserId] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
    if (token) {
      const { user } = JSON.parse(token);
      setLoginUserId(user.id);
    }
  }, []);

  const userId = useMemo(() => {
    if (loginUserId) {
      return loginUserId;
    }
  }, [loginUserId]);
  return userId as string;
};

export default useLoginUserId;
