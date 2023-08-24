import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost } from 'src/types/types';

const getPostLikes = async () => {
  const response = await supabase.from('post_likes').select('*');
  return response;
};

const getPostLike = async (postId: string) => {
  const response = await supabase.from('post_likes').select('*').eq('postId', postId);
  return response;
};

const addPostLike = async (postLike: string) => {
  await supabase.from('post_likes').insert(postLike).select();
};

const deletePostLike = async (id: string) => {
  await supabase.from('post_likes').delete().eq('id', id);
};

export { getPostLike, addPostLike, deletePostLike };
