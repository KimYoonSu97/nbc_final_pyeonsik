import supabase from 'src/lib/supabaseClient';

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

const updateFirstRecipeBadge = async (userId: string) => {
  const { data: badgeData, error: badgeError } = await supabase
    .from('badge')
    .select('recipeMania')
    .eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

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

const updateCommonPostBadge = async (userId: string) => {
  const { data: badgeData, error: badgeError } = await supabase.from('badge').select('soilChair').eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  if (badgeData && badgeData.length > 0 && badgeData[0].soilChair === true) {
    console.log('이미 업적을 달성한 사용자입니다.');
    return;
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('postCategory', 'common')
    .eq('userId', userId);

  if (postsError) {
    console.error('게시글 데이터를 가져올 수 없습니다.');
    return;
  }

  const postCount = postsData ? postsData.length : 0;

  if (postCount === 1) {
    const { error: updateError } = await supabase.from('badge').update({ soilChair: true }).eq('user_id', userId);
    alert('업적 달성! 그르르갉! ');
    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
      return;
    }
  }
};

const updateFirstCommentBadge = async (userId: string) => {
  const { data: badgeData, error: badgeError } = await supabase
    .from('badge')
    .select('firstComment')
    .eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  if (badgeData && badgeData.length > 0 && badgeData[0].firstComment === true) {
    console.log('이미 업적을 달성한 사용자입니다.');
    return;
  }

  const { error: updateError } = await supabase.from('badge').update({ firstComment: true }).eq('user_id', userId);
  alert('업적 달성! 따뜻함의 시작! ');

  if (updateError) {
    console.error('데이터를 업데이트할 수 없습니다.');
    return;
  }
};

const updateBugBadge = async (userId: string) => {
  const { data: badgeData, error: badgeError } = await supabase.from('badge').select('bug').eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  if (badgeData && badgeData.length > 0 && badgeData[0].bug === true) {
    console.log('이미 업적을 달성한 사용자입니다.');
    return;
  }

  const { error: updateError } = await supabase.from('badge').update({ bug: true }).eq('user_id', userId);
  alert('업적 달성! 사실상 당첨!');

  if (updateError) {
    console.error('데이터를 업데이트할 수 없습니다.');
    return;
  }
};

const updateSheriffBadge = async (userId: string) => {
  const { data: badgeData, error: badgeError } = await supabase.from('badge').select('sheriff').eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  if (badgeData && badgeData.length > 0 && badgeData[0].sheriff === true) {
    console.log('이미 업적을 달성한 사용자입니다.');
    return;
  }

  const { error: updateError } = await supabase.from('badge').update({ sheriff: true }).eq('user_id', userId);
  alert('업적 달성! 잡았다 요놈!');

  if (updateError) {
    console.error('데이터를 업데이트할 수 없습니다.');
    return;
  }
};

export {
  updateBadge,
  updateFirstRecipeBadge,
  updateCommonPostBadge,
  updateFirstCommentBadge,
  updateBugBadge,
  updateSheriffBadge
};
