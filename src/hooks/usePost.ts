import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';
import { useNavigate } from 'react-router';

const usePost = (prams?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', '/'] });

      navigate(`/`);
    }
  };
  const addPostMutate = useMutation(addPost, success);
  const deletePostMutate = useMutation(deletePost, success);

  const successRecipe = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', '/'] });
    }
  };
  const addRecipePostMutate = useMutation(addRecipePost, successRecipe);

  const successUpdate = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', prams] });
      navigate(`/detail/${prams}`);
    }
  };
  const tagUpdatePostMutate = useMutation(tagUpdatePost, successUpdate);
  const updatePostMutate = useMutation(updatePost, successUpdate);

  return { addPostMutate, updatePostMutate, deletePostMutate, addRecipePostMutate, tagUpdatePostMutate };
};

export default usePost;
