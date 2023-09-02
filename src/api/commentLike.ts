import supabase from 'src/lib/supabaseClient';
import { findMostCommonId } from './bestComment';

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
interface BestComment {
  commentId: { comment: string; created_at: string; id: string; postId: string; userId: string };
  userId: { nickname: string };
}

//포스트 아이디값을 기준으으로 댓글의 좋아요를 가져옴... 근데 내부에서 필터링을 거쳐서 가장 많은걸 가져오긴 힘든듯
const getBestCommentLikeByPostId = async (postId: string) => {
  const { data } = await supabase.from('comment_likes').select('commentId(*),userId(nickname)').eq('postId', postId);

  if (data?.length === 0) {
    return { commentId: false };
  }
  const response = findMostCommonId(data as unknown as BestComment[]);
  console.log(response);
  return response;
};

export { getLikeByCommentId, getBestCommentLikeByPostId };
