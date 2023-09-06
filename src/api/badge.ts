import supabase from 'src/lib/supabaseClient';

const updateBadge = async (user_id: string, badgeField: string) => {
  const { data, error } = await supabase.from('badge').select(badgeField).eq('user_id', user_id);

  if (error) {
    console.error('데이터를 가져올 수 없습니다.');
    return;
  }

  if (data && data.length > 0 && !data[0][badgeField as keyof (typeof data)[0]]) {
    const updatedData = { [badgeField]: true };
    const { error: updateError } = await supabase.from('badge').update(updatedData).eq('user_id', user_id);

    if (updateError) {
      console.error('데이터를 업데이트할 수 없습니다.');
      return;
    }
  } else {
    return;
  }
};

export { updateBadge };
