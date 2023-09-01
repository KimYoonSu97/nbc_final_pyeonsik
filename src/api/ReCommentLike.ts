import supabase from 'src/lib/supabaseClient';

const getLikeByReCommentId = async (commentId: string, userId: string) => {
  const { count: likeNum } = await supabase
    .from('replay_comment_likes')
    .select('userId', { count: 'exact', head: true })
    .eq('commentId', commentId);

  const { count: myLike } = await supabase
    .from('replay_comment_likes')
    .select('userId', { count: 'exact', head: true })
    .eq('commentId', commentId)
    .eq('userId', userId);

  const data = { likeNum, myLike };
  return data;
};

export { getLikeByReCommentId };
