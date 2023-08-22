import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost, Post } from 'src/types/types';

const getPosts = async () => {
  const response = await supabase.from('posts').select('*');
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
  await supabase.from('posts').update({ title: post.title }).eq('id', post.id).select();
};

const deletePost = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

export { getPosts, getPost, addPost, updatePost, deletePost };
