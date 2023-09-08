import supabase from 'src/lib/supabaseClient';

const getSwiperData = async () => {
  const response = await supabase.from('swiper').select('*');
  return response;
};

export { getSwiperData };
