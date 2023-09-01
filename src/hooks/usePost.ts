import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';

const usePost = () => {
  const queryClient = useQueryClient();

  // 삭정, 삭제
  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  };
  const addPostMutate = useMutation(addPost, success);
  const deletePostMutate = useMutation(deletePost, success);
  const addRecipePostMutate = useMutation(addRecipePost, success);

  // 수정
  const successUpdate = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      // 새로고침 시도
    }
  };
  const updatePostMutate = useMutation(updatePost, successUpdate);
  const tagUpdatePostMutate = useMutation(tagUpdatePost, successUpdate);

  return { addPostMutate, updatePostMutate, deletePostMutate, addRecipePostMutate, tagUpdatePostMutate };
};

export default usePost;
