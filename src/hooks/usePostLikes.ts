import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostLike, deletePostLike } from 'src/api/postLikes';

const usePostLikes = (argument: string) => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [argument] });
    }
  };

  const addPostLikeMutate = useMutation(addPostLike, success);
  const deletePostLikeMutate = useMutation(deletePostLike, success);

  return { addPostLikeMutate, deletePostLikeMutate };
};

export default usePostLikes;
