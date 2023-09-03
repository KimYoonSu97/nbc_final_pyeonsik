import supabase from 'src/lib/supabaseClient';
import { NewPostLike } from 'src/types/types';

const getPostBookmark = async (postId: string) => {
  const response = await supabase.from('post_bookmark').select('*').eq('postId', postId);
  return response;
};

const addPostBookmark = async (newPostBookmark: NewPostLike) => {
  await supabase.from('post_bookmark').insert(newPostBookmark).select();
};

const deletePostBookmark = async (id: string) => {
  await supabase.from('post_bookmark').delete().eq('id', id);
};

export { getPostBookmark, addPostBookmark, deletePostBookmark };
