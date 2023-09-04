import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';

const usePost = (prams?: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 작성, 삭제
  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', '/'] });
      navigate(`/`);
    }
  };
  const addPostMutate = useMutation(addPost, success);
  const deletePostMutate = useMutation(deletePost, success);
  const addRecipePostMutate = useMutation(addRecipePost, success);

  // 수정
  const successUpdate = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', prams] });
    }
  };
  const updatePostMutate = useMutation(updatePost, successUpdate);
  const tagUpdatePostMutate = useMutation(tagUpdatePost, successUpdate);

  return { addPostMutate, updatePostMutate, deletePostMutate, addRecipePostMutate, tagUpdatePostMutate };
};

export default usePost;
