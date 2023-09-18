import supabase from 'src/lib/supabaseClient';

const getProdData = async () => {

  const { data } = await supabase
    .from('show_products')
    .select('*')
    .order('created_at', { ascending: false })
    // .range(0,1)
    console.log("먼저와야할 프로드데이터",data)

  return data;
};

const getSwiperData = async () => {
  const response = await supabase.from('swiper').select('*');
  console.log('먼저와야할 스와이프데이터',response.data)
  return response;
};

const getReviewedProductData = async (prodId: string, userId: string) => {
  const { data } = await supabase.from('show_products').select('*').neq('prodId', prodId).eq('userId', userId);

  return data;
};

export { getSwiperData, getProdData, getReviewedProductData };
