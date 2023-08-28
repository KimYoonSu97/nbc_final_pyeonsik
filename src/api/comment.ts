import supabase from 'src/lib/supabaseClient';

export type CommentType = {
  comment: string;
  id: string;
  postId: string | undefined;
  userId: string | undefined;
};



// 포스트에 아이디에 해당하는 댓글 가져오기
const getCommentData = async (id: string) => {
  const { data } = await supabase
    .from('detail_comments')
    .select('*,users("*")')
    .eq('postId', id)
    .order('created_at', { ascending: false });
  return data;
};

//댓글 작성하기
const WriteCommentData = async (newcomment: Omit<CommentType, 'id'>) => {
  await supabase.from('detail_comments').insert([newcomment]);
};

//댓글 삭제하기
const deleteCommentData = async (id: string) => {
  await supabase.from('detail_comments').delete().eq('id', id);
};

//댓글 수정하기
const updateCommentData = async (comment:any) => {
    await supabase.from("detail_comments").update([comment]).eq('id',comment.id)
}

export { getCommentData, WriteCommentData, deleteCommentData, updateCommentData };
