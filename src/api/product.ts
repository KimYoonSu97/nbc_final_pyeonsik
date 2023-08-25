import supabase from 'src/lib/supabaseClient';

const getEventProd = async (page: number) => {
  console.log(page);
  const { data } = await supabase
    .from('products')
    .select('*')
    .not('event', 'is', null)
    .range(page * 100, (page + 1) * 100);

  console.log(data);
  return data;
};

export { getEventProd };
