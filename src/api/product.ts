import supabase from 'src/lib/supabaseClient';
import { ProdEvent, Product, InfinityProductList } from 'src/types/types';

const getEventProd = async (pageParam: number = 0, brandParam: string): Promise<InfinityProductList> => {
  //페이지가 어디냐에 따라 다른 쿼리
  let response;
  if (brandParam === 'all') {
    response = await supabase
      .from('products')
      .select('*')
      .not('event', 'is', null)
      .range(pageParam * 100, (pageParam + 1) * 100 - 1);
  } else {
    const filterStr = brandParam.slice(2);
    response = await supabase
      .from('products')
      .select('*')
      .not('event', 'is', null)
      .eq('prodBrand', filterStr)
      .range(pageParam * 100, (pageParam + 1) * 100 - 1);
  }

  //하단 리턴문을 위한 데이터 설정
  const data = response!.data;

  //페이지가 어디냐에 따라 다른 전체 페이지 수
  let pageCount;
  if (brandParam === 'all') {
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .not('event', 'is', null);
    pageCount = count;
  } else {
    const filterStr = brandParam.slice(2);
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('prodBrand', filterStr)
      .not('event', 'is', null);
    pageCount = count;
  }
  // -=---

  //리턴을 위한 총 페이지 수는?
  const total_pages = pageCount ? Math.floor(pageCount / 100) + (pageCount % 100 === 0 ? 0 : 1) : 1;
  console.log(brandParam, '이 브랜드의 전체 페이지 수', total_pages);
  // console.log(data);

  return { products: data!, page: pageParam, total_pages, total_results: pageCount! };
};

export { getEventProd };

// const getPosts = async (pageParam: number = 1): Promise<ToTalDataType> => {
//   let data: any = [];
//   let count = null;

//     const freePosts = await supabase
//       .from('post')
//       .select('*')
//       .order('date', { ascending: false })
//       .eq('category', '자유')
//       .range(pageParam * 10 - 10, pageParam * 10 - 1);

//     data = freePosts.data;

//     const { count: freeCount } = await supabase.from('post').select('count', { count: 'exact' }).eq('category', '자유');

//     count = freeCount;

//   // 총 페이지 개수 계산
//   const total_pages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

//   return { posts: data , page: pageParam, total_pages, total_results: count };
// };
