import supabase from 'src/lib/supabaseClient';
import { NewPostLike } from 'src/types/types';

const getPostLikes = async () => {
  const response = await supabase.from('post_likes').select('*');
  return response;
};

const getPostLike = async (postId: string) => {
  const response = await supabase.from('post_likes').select('*').eq('postId', postId);
  return response;
};

const addPostLike = async (newPostLike: NewPostLike) => {
  const { data, error } = await supabase.from('post_likes').insert(newPostLike).select();
};

const deletePostLike = async (id: string) => {
  await supabase.from('post_likes').delete().eq('id', id);
};

export { getPostLike, addPostLike, deletePostLike };
