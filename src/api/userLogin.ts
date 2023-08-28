import supabase from 'src/lib/supabaseClient';

//로그인시 헤더 정보
const getUserData = async (id: string) => {
  console.log('업데이트 실행?');
  return await supabase.from('users').select('*').eq('id', id).single();
};

interface UpdateUser {
  id: string;
  profileImg?: string | null | ArrayBuffer;
  nickname?: string;
}

const updateUserNickname = async ({ nickname, id }: UpdateUser) => {
  await supabase.from('users').update({ nickname }).eq('id', id);
};
const updateProfileImg = async ({ profileImg, id }: UpdateUser) => {
  console.log('업데이트 실행?');
  await supabase.from('users').update({ profileImg }).eq('id', id);
};

//로그아웃 버튼 클릭시 헤더 리렌더링
const userLogOut = async () => {
  console.log('로그아웃 쿼리 실행');
  let { error } = await supabase.auth.signOut();
};

export { getUserData, updateProfileImg, updateUserNickname, userLogOut };
