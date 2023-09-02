import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';

const usePost = (prams?: string) => {
  const queryClient = useQueryClient();

  // 게시, 삭제
  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', '/'] });
    }
  };
  const addPostMutate = useMutation(addPost, success);
  const deletePostMutate = useMutation(deletePost, success);
  const addRecipePostMutate = useMutation(addRecipePost, success);

  // 수정
  const successUpdate = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', prams] });
      // 새로고침 시도
    }
  };
  const updatePostMutate = useMutation(updatePost, successUpdate);
  const tagUpdatePostMutate = useMutation(tagUpdatePost, successUpdate);

  return { addPostMutate, updatePostMutate, deletePostMutate, addRecipePostMutate, tagUpdatePostMutate };
};

export default usePost;
