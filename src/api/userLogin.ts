import { supabase } from 'src/supabse';

//로그인시 헤더 정보
const getUserData = async (id: string) => {
  console.log('로그인시 가져오는 헤더 정보 쿼리실행');
  const response = await supabase.from('users').select('*').eq('id', id).single();
  return response;
};

//로그아웃 버튼 클릭시 헤더 리렌더링
const userLogOut = async () => {
  console.log('로그아웃 쿼리 실행');

  let { error } = await supabase.auth.signOut();
};

export { getUserData, userLogOut };
