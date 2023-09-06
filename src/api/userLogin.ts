import supabase from 'src/lib/supabaseClient';

interface UpdateUser {
  id: string;
  profileImg?: string | null | ArrayBuffer;
  nickname?: string;
}
interface UpdateUserLevel {
  userId: string;
  level: string;
}

//로그인시 헤더 정보
const getUserData = async (id: string) => {
  return await supabase.from('users').select('*').eq('id', id).single();
};

const updateUserNickname = async ({ nickname, id }: UpdateUser) => {
  await supabase.from('users').update({ nickname }).eq('id', id);
};

const updateProfileImg = async ({ profileImg, id }: UpdateUser) => {
  await supabase.from('users').update({ profileImg }).eq('id', id);
};

const updateUserLevel = async ({ userId, level }: UpdateUserLevel) => {
  await supabase.from('users').update({ level }).eq('id', userId);
};

const deleteUser = async (userId: string) => {
  await supabase.from('users').delete().eq('id', userId);
  alert('탈퇴가 완료되었습니다.');
};

export { getUserData, updateProfileImg, updateUserNickname, updateUserLevel, deleteUser };
