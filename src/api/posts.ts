import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost } from 'src/types/types';

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
  await supabase.from('posts').update(post).eq('id', post.id).select();
};

const deletePost = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

// MyPosts
const getMyPostsById = async (id: string) => {
  const response = await supabase.from('posts').select('*,userId(nickname,profileImg)').eq('userId', id);
  return response;
};

const getMyBookMarkById = async (id: string) => {
  const response = await supabase.from('post_bookmark').select('postId(*,userId(*))').eq('userId', id);
  return response;
};

const getMyLikePostById = async (id: string) => {
  const response = await supabase.from('post_likes').select('postId(*,userId(*))').eq('userId', id);
  return response;
};

export { getPosts, getMyPostsById, getMyLikePostById, getMyBookMarkById, getPost, addPost, updatePost, deletePost };
