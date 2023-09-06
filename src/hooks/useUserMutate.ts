import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { updateProfileImg, updateUserNickname, updateUserLevel, deleteUser } from 'src/api/userLogin';

const useUserMutate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loginUser'] });
    }
  };

  //닉네임 수정 시 바로 렌더링
  const nicknameMutation = useMutation(updateUserNickname, success);
  //프로필 이미지 수정 시 바로 렌더링
  const profileImgMutation = useMutation(updateProfileImg, success);
  // 유저 레벨업
  const levelMutation = useMutation(updateUserLevel, success);

  // 사용자 정보 삭제
  // const deleteUserMutate = useMutation(deleteUser, successDelete);

  return { nicknameMutation, profileImgMutation, levelMutation };
};

export default useUserMutate;
