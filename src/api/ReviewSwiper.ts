import supabase from 'src/lib/supabaseClient';

const getProdData = async () => {
  const { data } = await supabase
    .from('show_products')
    .select('*')
    .order('created_at', { ascending: false })
    .range(0, 1);
  return data;
};

const getSwiperData = async () => {
  const response = await supabase.from('swiper').select('*');
  return response;
};

// const getProdId = async (id:string) => {
//   const {data} = await supabase.from('show_products').select("*").eq("id",id).single()
//   // console.log("11111111111",data)
//   return data;
// }
const getReviewedProductData = async (prodId: string, userId: string) => {
  const { data } = await supabase.from('show_products').select('*').neq('prodId', prodId).eq('userId', userId);
  // console.log("22222222",data)
  return data;
};

export { getSwiperData, getProdData, getReviewedProductData };
