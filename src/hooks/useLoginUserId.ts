import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from 'src/globalState/jotai';
import supabase from 'src/lib/supabaseClient';

const useLoginUserId = () => {
  const [loginUserId, setLoginUserId] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('sb-wwkfivwrtwucsiwsnisz-auth-token');
    if (token) {
      const { user } = JSON.parse(token);
      setLoginUserId(user.id);
    }
  }, []);

  //loginUserId가 바뀌지 않는 한 다시 지정하지 않습니다.
  const userId = useMemo(() => {
    if (loginUserId) {
      return loginUserId;
    }
  }, [loginUserId]);
  return userId as string;
};

export default useLoginUserId;
