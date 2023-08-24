import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost } from 'src/api/posts';

const useMutate = (argument: string) => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [argument] });
    }
  };

  const addMutate = useMutation(addPost, success);
  const updateMutate = useMutation(updatePost, success);
  const deleteMutate = useMutation(deletePost, success);

  return { addMutate, updateMutate, deleteMutate };
};

export default useMutate;
