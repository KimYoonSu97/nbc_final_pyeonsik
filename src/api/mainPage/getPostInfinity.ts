import supabase from 'src/lib/supabaseClient';

const getPosts = async (pageParam: number = 0, pageKey: string, mypage?: string) => {
  let response;
  if (pageKey === '') {
    response = await supabase
      .from('posts')
      .select('*,userId(id,nickname,profileImg),orgPostId(*,userId(nickname))')
      .order('created_at', { ascending: false })
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);
  } else {
    response = await supabase
      .from('posts')
      .select('*,userId(id,nickname,profileImg),orgPostId(*,userId(nickname))')
      .order('created_at', { ascending: false })
      .eq('postCategory', pageKey.slice(2))
      .range(pageParam * 10, (pageParam + 1) * 10 - 1);
  }

  //하단 리턴문을 위한 데이터 설정
  const data = response!.data;

  //페이지가 어디냐에 따라 다른 전체 페이지 수
  let pageCount;
  if (pageKey === '') {
    const { count } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    pageCount = count;
  } else {
    const { count } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('postCategory', pageKey);
    pageCount = count;
  }

  //리턴을 위한 총 페이지 수는?
  const total_pages = Math.floor(pageCount! / 20);

  return { posts: data!, page: pageParam, total_pages, total_results: pageCount! };
};

export { getPosts };
