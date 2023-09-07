import supabase from 'src/lib/supabaseClient';

const getUserIdBadgeCount = async (userId: string) => {
  const { data, error } = await supabase.from('badge').select('*').eq('user_id', userId);

  if (error) {
    console.error('데이터를 가져올 수 없습니다.');
    return 0;
  }

  const trueBadgeCount = data.filter((badge) => badge && badge.sheriff === true).length; // sheriff 업적에 대한 예시

  return trueBadgeCount;
};

export { getUserIdBadgeCount };
