import supabase from 'src/lib/supabaseClient';

export type CommentType = {
  comment: string;
  id: string;
  postId: string | undefined;
  userId: string | undefined;
};

const getCommentDataByPostId = async (postId:string) => {
  const { data } = await supabase
    .from('detail_comments')
    .select('*,users("*")')
    .eq('postId', postId)
    .order('created_at', { ascending: false });
  return data;
};

const getCommentCountDataByPostId = async (postId: string) => {
  const { count } = await supabase
    .from('detail_comments')
    .select('id', { count: 'exact', head: true })
    .eq('postId', postId);

  const { count: recomment } = await supabase
    .from('replay_comments')
    .select('id', { count: 'exact', head: true })
    .eq('postId', postId);

  const response = recomment! + count!;

  return response;
};

const WriteCommentData = async (newcomment: Omit<CommentType, 'id'>) => {
  await supabase.from('detail_comments').insert([newcomment]);
};

const deleteCommentData = async (id: string) => {
  await supabase.from('detail_comments').delete().eq('id', id);
};

const updateCommentData = async (comment: any) => {
  await supabase.from('detail_comments').update([comment]).eq('id', comment.id);
};

export { getCommentCountDataByPostId, getCommentDataByPostId, WriteCommentData, deleteCommentData, updateCommentData };
