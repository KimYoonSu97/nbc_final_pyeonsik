import { toast } from 'react-toastify';
import supabase from 'src/lib/supabaseClient';

export const levelChecker = async (userId: string): Promise<{ isNeedUpdate: boolean; userLevel: string | null }> => {
  const { count } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('userId', userId)
    .eq('postCategory', 'recipe');

  //기존의 유저의 레벨을 가져옵니다.
  const { data } = await supabase.from('users').select('level').eq('id', userId).single();

  let userLevel: string | null = null;

  // 알러트 함수와 업데이트할 유저의 레벨값,
  if (count! === 50) {
    //이미 점장이라면?
    if (data?.level === '점장') {
      return { isNeedUpdate: false, userLevel: null };
    }

    toast('레시피를 50개이상 작성하셔서 점장님이 되었습니다. 이쯤되면 입사하세요.');
    userLevel = '점장';
  } else if (count! === 30) {
    //이미 부점장이라면?
    if (data?.level === '부점장') {
      return { isNeedUpdate: false, userLevel: null };
    }
    toast('레시피를 30개이상 작성하셔서 부점장로 레벨업하였습니다. 50개를 작성하시면 점장으로 승진할 수 있습니다.');
    userLevel = '부점장';
  } else if (count! === 15) {
    //이미 매니저라면?
    if (data?.level === '매니저') {
      return { isNeedUpdate: false, userLevel: null };
    }
    toast('레시피를 15개이상 작성하셔서 매니저로 레벨업하였습니다. 30개를 작성하시면 부점장으로 승진할 수 있습니다.');
    userLevel = '매니저';
  } else if (count! === 8) {
    //이미 알바이라면?
    if (data?.level === '알바') {
      return { isNeedUpdate: false, userLevel: null };
    }
    toast('레시피를 8개 이상 작성하셔서 알바로 레벨업하였습니다. 15개를 작성하시면 매니저로 승진할 수 있습니다.');
    userLevel = '알바';
  }
  // 위에 조건식에서 걸려서 userLevel이 세팅되었다면?

  if (userLevel === null) {
    return { isNeedUpdate: false, userLevel: null };
  }
  return { isNeedUpdate: true, userLevel };
};
