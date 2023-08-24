import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostBookmark, deletePostBookmark } from 'src/api/postBookmark';

const usePostBookmark = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post_bookmark'] });
    }
  };

  const addPostBookmarkMutate = useMutation(addPostBookmark, success);
  const deletePostBookmarkMutate = useMutation(deletePostBookmark, success);

  return { addPostBookmarkMutate, deletePostBookmarkMutate };
};

export default usePostBookmark;
