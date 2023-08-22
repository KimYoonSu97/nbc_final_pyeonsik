import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost } from 'src/components/api/posts';

const usePost = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Post'] });
    }
  };

  const addPostMutation = useMutation(addPost, success);
  const updatePostMutation = useMutation(updatePost, success);
  const deletePostMutation = useMutation(deletePost, success);

  return { addPostMutation, updatePostMutation, deletePostMutation };
};

export default usePost;
