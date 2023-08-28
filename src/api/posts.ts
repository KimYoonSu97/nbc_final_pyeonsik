import supabase from 'src/lib/supabaseClient';
import { EditPost, NewPost, RecipeNewPost, TagEditPost } from 'src/types/types';

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
const updatePost = async (post: EditPost) => {
  await supabase.from('posts').update(post).eq('id', post.id).select();
};
const deletePost = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

// post image tag
const addRecipePost = async (post: RecipeNewPost) => {
  await supabase.from('posts').insert(post).select();
};

const tagUpdatePost = async (post: TagEditPost) => {
  console.log('updatePost2의 뉴포스트=>>', post);
  await supabase.from('posts').update(post).eq('id', post.id).select();
};

// MyPosts
const getMyPostsById = async (id: string) => {
  const response = await supabase.from('posts').select('*,userId(nickname,profileImg)').eq('userId', id);
  return response;
};

const getMyBookMarkById = async (id: string) => {
  const response = await supabase.from('post_bookmark').select('postId(*,userId(*))').eq('userId', id);
  console.log(response.error);
  console.log(response.data);
  return response;
};

const getMyLikePostById = async (id: string) => {
  const response = await supabase.from('post_likes').select('postId(*,userId(*))').eq('userId', id);
  console.log(response.error);
  console.log(response.data);
  return response;
};
interface Search {
  keyword: string;
  type?: string;
}
const getPostByKeyword = async ({ keyword, type }: Search) => {
  if (type === 'all') {
    return await supabase.from('posts').select('*').textSearch('title_body', keyword);
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
