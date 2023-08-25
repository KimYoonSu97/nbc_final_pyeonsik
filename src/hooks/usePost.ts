import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost, addPost2 } from 'src/api/posts';

const useMutate = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  };

  const addPostMutate = useMutation(addPost, success);
  const addPostMutate2 = useMutation(addPost2, success);
  const updatePostMutate = useMutation(updatePost, success);
  const deletePostMutate = useMutation(deletePost, success);

  return { addPostMutate, updatePostMutate, deletePostMutate, addPostMutate2 };
};

export default useMutate;
