import supabase from 'src/lib/supabaseClient';
import { NewPostLike } from 'src/types/types';

const getPostLike = async (postId: string) => {
  const response = await supabase.from('post_likes').select('*').eq('postId', postId);
  return response;
};

const addPostLike = async (newPostLike: NewPostLike) => {
  await supabase.from('post_likes').insert(newPostLike).select();
};

const deletePostLike = async (id: string) => {
  await supabase.from('post_likes').delete().eq('id', id);
};

export { getPostLike, addPostLike, deletePostLike };
