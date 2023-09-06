import supabase from 'src/lib/supabaseClient';

//북마크 눌렀을 때 업데이트 하는 함수
const updateBadge = async (user_id: string, badgeField: string) => {
  const { data, error } = await supabase.from('badge').select(badgeField).eq('user_id', user_id);

  if (error) {
    console.error('데이터를 가져올 수 없습니다.');
    return;
  }

  if (data && data.length > 0 && !data[0][badgeField as keyof (typeof data)[0]]) {
    const updatedData = { [badgeField]: true };
    const { error: updateError } = await supabase.from('badge').update(updatedData).eq('user_id', user_id);
    alert('업적 달성! 찾았다 인생 조합! ');
    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
      return;
    }
  } else {
    console.error('데이터가 false입니다.');
    return;
  }
};

//레시피 글 작성시 업적 업데이트 되는 함수
const updateFirstRecipeBadge = async (userId: string) => {
  // 해당 사용자의 업적 데이터 조회
  const { data: badgeData, error: badgeError } = await supabase
    .from('badge')
    .select('recipeMania')
    .eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  // 이미 recipeMania 업적을 달성한 경우, 업데이트하지 않음
  if (badgeData && badgeData.length > 0 && badgeData[0].recipeMania === true) {
    console.log('이미 업적을 달성한 사용자입니다.');
    return;
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('postCategory', 'recipe')
    .eq('userId', userId);

  if (postsError) {
    console.error('게시글 데이터를 가져올 수 없습니다.');
    return;
  }

  const postCount = postsData ? postsData.length : 0;

  if (postCount === 1) {
    const { error: updateError } = await supabase.from('badge').update({ firstRecipe: true }).eq('user_id', userId);
    alert('업적 달성! 나만의 첫 레시피! ');
    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
      return;
    }
  }

  if (postCount >= 10) {
    const { error: updateError } = await supabase.from('badge').update({ recipeMania: true }).eq('user_id', userId);
    alert('업적 달성! 레시피 마니아! ');
    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
      return;
    }
  }
};

export { updateBadge, updateFirstRecipeBadge };
