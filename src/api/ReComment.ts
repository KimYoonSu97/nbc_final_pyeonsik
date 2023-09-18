import supabase from 'src/lib/supabaseClient';

interface ReCommentType {
  id?: string;
  parent_commentId?: string;
  comment: string;
  postId: string | undefined;
  userId: string | undefined;
}

const getReCommentDataByCommentId = async (commentId: string) => {
  const { data, count: reCommentCount } = await supabase
    .from('replay_comments')
    .select(`*,users("*")`)
    .eq('parent_commentId', commentId);

  let response = { data, count: data?.length };
  return response;
};

const getReCommentData = async (parentId: string | null) => {
  const { data } = await supabase.from('replay_comments').select(`*,users("*")`).eq('parent_commentId', parentId);
  return data;
};

const writeReCommentData = async (newReComment: Omit<ReCommentType, 'id' | 'parent_commentId'>) => {
  await supabase.from('replay_comments').insert([newReComment]);
};

const deleteReCommentData = async (id: string) => {
  await supabase.from('replay_comments').delete().eq('id', id);
};

const updateReCommentData = async (comment: any) => {
  await supabase.from('replay_comments').update([comment]).eq('id', comment.id);
};

export { getReCommentDataByCommentId, getReCommentData, writeReCommentData, deleteReCommentData, updateReCommentData };
