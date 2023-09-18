import supabase from 'src/lib/supabaseClient';

const getPosts = async (pageParam: number = 0, pageKey: string, mypage?: string) => {
  let response;
  if (pageKey === '/') {
    response = await supabase
      .from('posts')
      .select('*,userId(id,nickname,profileImg,level),orgPostId(*,userId(nickname))')
      .order('created_at', { ascending: false })
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);
  } else {
    response = await supabase
      .from('posts')
      .select('*,userId(id,nickname,profileImg,level),orgPostId(*,userId(nickname))')
      .order('created_at', { ascending: false })
      .eq('postCategory', pageKey.slice(2))
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);
  }

  const data = response!.data;

  let pageCount;
  if (pageKey === '/') {
    const { count } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    pageCount = count;
  } else {
    const { count } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('postCategory', pageKey);
    pageCount = count;
  }

  const total_pages = Math.floor(pageCount! / 10);

  return { posts: data!, page: pageParam, total_pages, total_results: pageCount! };
};

export { getPosts };
