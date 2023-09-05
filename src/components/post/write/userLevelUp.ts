//   // 여기에 유저가 쓴 레시피의 게시물 숫자를 체크해서 올려주는 함수 작성..
//   if (count) {
//     // 검사..
//     let userLevel: string;
//     if (count! === 50) {
//       // 알러트 함수와 업데이트할 유저의 레벨값,
//       alert('레시피를 50개이상 작성하셔서 점장님이 되었습니다. 이쯤되면 입사하세요.');
//       userLevel = '점장';
//     } else if (count! === 30) {
//       alert('레시피를 30개이상 작성하셔서 부점장로 레벨업하였습니다. 50개를 작성하시면 점장으로 승진할 수 있습니다.');
//       userLevel = '부점장';
//     } else if (count! === 15) {
//       alert('레시피를 15개이상 작성하셔서 매니저로 레벨업하였습니다. 30개를 작성하시면 부점장으로 승진할 수 있습니다.');
//       userLevel = '매니저';
//     } else if (count! === 8) {
//       alert('레시피를 8개 이상 작성하셔서 알바로 레벨업하였습니다. 15개를 작성하시면 매니저로 승진할 수 있습니다.');
//       userLevel = '알바';
//     } else {
//       alert('아무일도 안일어남');
//       return;
//     }
//     // 위에 조건식에서 걸려서 userLevel이 세팅되었다면?
//     if (userLevel !== undefined) {
//       alert('아무일도 안일어났을땐 이게 호출되면 안됨');
//       await updateUserLevel(post.userId, userLevel);
//     }
//     //

//   }

import supabase from 'src/lib/supabaseClient';

export const levelChecker = async (userId: string): Promise<{ isNeedUpdate: boolean; userLevel: string | null }> => {
  const { count } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('userId', userId)
    .eq('postCategory', 'recipe');

  let userLevel: string | null = null;

  if (count! === 50) {
    // 알러트 함수와 업데이트할 유저의 레벨값,
    alert('레시피를 50개이상 작성하셔서 점장님이 되었습니다. 이쯤되면 입사하세요.');
    userLevel = '점장';
  } else if (count! === 30) {
    alert('레시피를 30개이상 작성하셔서 부점장로 레벨업하였습니다. 50개를 작성하시면 점장으로 승진할 수 있습니다.');
    userLevel = '부점장';
  } else if (count! === 15) {
    alert('레시피를 15개이상 작성하셔서 매니저로 레벨업하였습니다. 30개를 작성하시면 부점장으로 승진할 수 있습니다.');
    userLevel = '매니저';
  } else if (count! === 8) {
    alert('레시피를 8개 이상 작성하셔서 알바로 레벨업하였습니다. 15개를 작성하시면 매니저로 승진할 수 있습니다.');
    userLevel = '알바';
  }
  // 위에 조건식에서 걸려서 userLevel이 세팅되었다면?

  if (userLevel === null) {
    return { isNeedUpdate: false, userLevel: null };
  }
  return { isNeedUpdate: true, userLevel };
};
