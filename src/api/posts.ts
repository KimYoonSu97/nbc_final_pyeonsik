import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost } from 'src/types/types';

const getPosts = async () => {
  const response = await supabase.from('posts').select('*');
  return response;
};

const getMyPostsById = async (id: string) => {
  const response = await supabase.from('posts').select('*').eq('userId', id);
  return response;
};

const getMyBookMarkById = async (id: string) => {
  console.log(id);
  const response = await supabase.from('posts').select('*');
  console.log(response);
  return response;
};

const getPost = async (id: string) => {
  const response = await supabase.from('posts').select('*').eq('id', id);
  return response;
};

const addPost = async (post: NewPost) => {
  await supabase.from('posts').insert(post).select();
};

const updatePost = async (post: EditPost) => {
  await supabase.from('posts').update(post).eq('id', post.id).select();
};

const deletePost = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

export { getPosts, getMyPostsById, getMyBookMarkById, getPost, addPost, updatePost, deletePost };