import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostLike, deletePostLike } from 'src/api/postLikes';

const usePostLikes = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post_likes'] });
    }
  };

  const addPostLikeMutate = useMutation(addPostLike, success);
  const deletePostLikeMutate = useMutation(deletePostLike, success);

  return { addPostLikeMutate, deletePostLikeMutate };
};

export default usePostLikes;
