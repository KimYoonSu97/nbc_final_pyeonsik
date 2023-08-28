import supabase from 'src/lib/supabaseClient';

const getLike = async () => {

  const { data } = await supabase.from('comment_likes').select('commentId,userId');

  return data;
};

const addLike = async ({ commentId, userId }: { commentId: string; userId: string | undefined }) => {
  await supabase.from('comment_likes').insert({ commentId, userId });
};

const deleteLike = async ({ commentId, userId }: { commentId: string; userId: string| undefined }) => {
  await supabase.from('comment_likes').delete().eq('commentId', commentId).eq('userId', userId);
};


export { getLike, addLike, deleteLike };
