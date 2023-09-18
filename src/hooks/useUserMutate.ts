import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileImg, updateUserNickname, updateUserLevel, deleteUser } from 'src/api/userLogin';

const useUserMutate = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loginUser'] });
    }
  };

  const nicknameMutation = useMutation(updateUserNickname, success);
  const profileImgMutation = useMutation(updateProfileImg, success);
  const levelMutation = useMutation(updateUserLevel, success);

  return { nicknameMutation, profileImgMutation, levelMutation };
};

export default useUserMutate;
