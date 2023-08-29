import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost, NewRecipePost, TagEditPost } from 'src/types/types';

const getPosts = async () => {
  const response = await supabase
    .from('posts')
    .select('*,userId(nickname,profileImg)')
    .order('created_at', { ascending: false });
  // .range(0, 9);
  return response;
};

// post
const getPost = async (id: string) => {
  const response = await supabase.from('posts').select('*,userId(*),orgPostId(*),orgUserId(*)').eq('id', id);
  return response;
};
const addPost = async (post: NewPost) => {
  await supabase.from('posts').insert(post).select();
};

//값 타입이 달라져서 추가했습니다! - 원유길
const addRecipePost = async (post: NewRecipePost) => {
  await supabase.from('posts').insert(post).select();
};

const updatePost = async (post: EditPost) => {
  await supabase.from('posts').update(post).eq('id', post.id).select();
};
const deletePost = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

const tagUpdatePost = async (post: TagEditPost) => {
  await supabase.from('posts').update(post).eq('id', post.id).select();
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
interface Search {
  keyword: string;
  type?: string;
}
const getPostByKeyword = async ({ keyword, type }: Search) => {
  if (type === 'all') {
    return await supabase.from('posts').select('*').ilike('title_body', `%${keyword}%`);
  } else {
    return await supabase.from('posts').select('*').eq('postCategory', type).textSearch('title_body', keyword);
  }
};

export {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getMyPostsById,
  getMyLikePostById,
  getMyBookMarkById,
  addRecipePost,
  tagUpdatePost,
  getPostByKeyword
};
