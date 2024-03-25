import supabase from 'src/lib/supabaseClient';

export const onDropToLike = async (id: string | undefined, userId: string) => {
  const addReview = {
    prodId: id,
    isGood: true,
    userId: userId
  };
  await supabase.from('swiper').insert([addReview]);
};

export const onDropToDisLike = async (id: string | undefined, userId: string) => {
  const addReview = {
    prodId: id,
    isGood: false,
    userId: userId
  };
  await supabase.from('swiper').insert([addReview]);
};
