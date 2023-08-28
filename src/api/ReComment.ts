import supabase from 'src/lib/supabaseClient';

interface ReCommentType {
  id: string;
  parent_commentId: string;
  comment: string;
  postId : string | undefined;
  userId :string | undefined;
}

const getReCommentData = async (parentId : string | null) => {
  const { data } = await supabase.from('replay_comments').select(`*,users("*")`).eq("parent_commentId",parentId);
  return data;
};

//댓글 작성하기
const writeReCommentData = async (newReComment: Omit<ReCommentType, 'id' | 'parent_commentId'>) => {
  await supabase.from('replay_comments').insert([newReComment]);
};

//댓글 삭제하기
const deleteReCommentData = async (id: string) => {
  await supabase.from('replay_comments').delete().eq('id', id);
};

const updateReCommentData = async (comment:any) => {
  await supabase.from('replay_comments').update([comment]).eq('id', comment.id);
};

export { getReCommentData, writeReCommentData, deleteReCommentData,updateReCommentData };
