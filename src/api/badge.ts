import BadgeAlert from 'src/components/popUp/BadgeAlert';
import supabase from 'src/lib/supabaseClient';
// 업적을 업데이트하는 함수
const updateBadge = async (userId: string, badgeField: string) => {
  const { data: badgeData, error: badgeError } = await supabase.from('badge').select(badgeField).eq('user_id', userId);

  if (badgeError) {
    console.error('업적 데이터를 가져올 수 없습니다.');
    return;
  }

  if (badgeData && badgeData.length > 0 && !badgeData[0][badgeField as keyof (typeof badgeData)[0]]) {
    const updatedData = { [badgeField]: true };
    const { error: updateError } = await supabase.from('badge').update(updatedData).eq('user_id', userId);
    await BadgeAlert(badgeField);
    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
    }
  } else {
    console.error('이미 달성한 유저입니다.');
  }
};

// 게시글 수를 가져오는 함수
const getPostCount = async (userId: string, postCategory: string) => {
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('postCategory', postCategory)
    .eq('userId', userId);

  if (postsError) {
    console.error('게시글 데이터를 가져올 수 없습니다.');
    return 0;
  }

  return postsData ? postsData.length : 0;
};

// 다양한 업적 업데이트 함수
const updateFirstRecipeBadge = async (userId: string) => {
  const postCount = await getPostCount(userId, 'recipe');

  if (postCount === 1) {
    await updateBadge(userId, 'firstRecipe');
  }

  if (postCount >= 10) {
    await updateBadge(userId, 'recipeMania');
  }
};

const updateCommonPostBadge = async (userId: string) => {
  const postCount = await getPostCount(userId, 'common');

  if (postCount === 1) {
    await updateBadge(userId, 'soilChair');
  }
};

const updateFirstCommentBadge = async (userId: string) => {
  await updateBadge(userId, 'firstComment');
};

const updateBugBadge = async (userId: string) => {
  await updateBadge(userId, 'bug');
};

const updateSheriffBadge = async (userId: string) => {
  await updateBadge(userId, 'sheriff');
};

const updateBookmarkBadge = async (userId: string) => {
  await updateBadge(userId, 'bookMark');
};

export {
  updateBadge,
  updateFirstRecipeBadge,
  updateCommonPostBadge,
  updateFirstCommentBadge,
  updateBugBadge,
  updateSheriffBadge,
  updateBookmarkBadge
};
