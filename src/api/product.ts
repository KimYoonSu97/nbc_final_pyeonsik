import supabase from 'src/lib/supabaseClient';
import { InfinityProductList, Product } from 'src/types/types';

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

  //리턴을 위한 총 페이지 수는?
  const total_pages = Math.floor(pageCount! / 100);

  return { products: data!, page: pageParam, total_pages, total_results: pageCount! };
};

const getSearchProd = async (pageParam: number = 0, keyword: string) => {
  const response = await supabase
    .from('products')
    .select('*')
    .range(pageParam * 100, (pageParam + 1) * 100 - 1)
    .filter('prodName', 'ilike', `%${keyword}%`);

  //하단 리턴문을 위한 데이터 설정
  const data = response!.data;

  //페이지가 어디냐에 따라 다른 전체 페이지 수
  let pageCount;
  const { count } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .filter('prodName', 'ilike', `%${keyword}%`);
  pageCount = count;

  //리턴을 위한 총 페이지 수는?
  const total_pages = Math.floor(pageCount! / 100);

  return { products: data!, page: pageParam, total_pages, total_results: pageCount! };
};

const getSearchProdSummary = async (keyword: string) => {
  const { data } = await supabase.from('products').select('*').filter('prodName', 'ilike', `%${keyword}%`).range(0, 3);
  const productData = data as Product[];
  return productData;
};

// new products
const getNewProd = async (pageParam: number = 0) => {
  const response = await supabase
    .from('show_products')
    .select('*')
    // .order('created_at', { ascending: false })
    .range(pageParam * 20, (pageParam + 1) * 20 - 1);

  const data = response!.data;

  let pageCount;
  const { count } = await supabase.from('show_products').select('id', { count: 'exact', head: true });
  // .order('created_at', { ascending: false });
  pageCount = count;

  const total_pages = Math.floor(pageCount! / 20);

  return { error: response.error, products: data!, page: pageParam, total_pages, total_results: pageCount! };
};

export { getEventProd, getSearchProd, getSearchProdSummary, getNewProd };
