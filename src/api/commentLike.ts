import supabase from 'src/lib/supabaseClient';

const getLikeByCommentId = async (commentId: string, userId: string) => {
  const { count: likeNum } = await supabase
    .from('comment_likes')
    .select('userId', { count: 'exact', head: true })
    .eq('commentId', commentId);

  const { count: myLike } = await supabase
    .from('comment_likes')
    .select('userId', { count: 'exact', head: true })
    .eq('commentId', commentId)
    .eq('userId', userId);

  const data = { likeNum, myLike };

  return data;
};

// //포스트 아이디값을 기준으으로 댓글을 가져옴... 근데 내부에서 필터링을 거쳐서 가장 많은걸 가져오긴 힘든듯
// const getComentLikeByPostId = async (postId: string) => {
//   const { data } = await supabase.from('comment_likes').select('commentId(*)').eq('postId', postId);
//   console.log(data);
//   return data;
// };

export { getLikeByCommentId };
