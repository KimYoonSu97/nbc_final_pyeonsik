import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { userAtom } from 'src/globalState/jotai';
import { supabase } from 'src/supabse';

const useLoginUserId = () => {
  const [loginUserId, setLoginUserId] = useState<string>('');
  // const [userLogin] = useAtom(userAtom);

  // const getUser = async () => {
  //   const { data, error } = await supabase.auth.getUser();
  //   console.log(data);
  // };

  useEffect(() => {
    // getUser();
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

  console.log('유저 훅에서 찍은 유저 아이디', userId);
  return userId as string;
};

export default useLoginUserId;
