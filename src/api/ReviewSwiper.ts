import supabase from 'src/lib/supabaseClient';

const getProdData = async () => {
  const { data } = await supabase
    .from('show_products')
    .select('*')
    .order('created_at', { ascending: false })
  return data;
};

const getSwiperData = async () => {
  const response = await supabase.from('swiper').select('*');
  return response;
};

export { getSwiperData,getProdData };
