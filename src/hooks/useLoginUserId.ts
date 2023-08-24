import { useEffect, useMemo, useState } from 'react';

const useLoginUserId = () => {
  const [loginUserId, setLoginUserId] = useState(null);

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

  // handler

  return userId;
};

export default useLoginUserId;
