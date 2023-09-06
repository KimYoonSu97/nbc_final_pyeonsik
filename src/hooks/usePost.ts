import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';
import supabase from 'src/lib/supabaseClient';

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

  // 레시피 작성은 여기서 네비게이트 하면 안됨 유저 레벨때문에 삭제 작성따로 네비게이트 만들어주겠음
  const successRecipe = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList', '/'] });
    }
  };
  const addRecipePostMutate = useMutation(addRecipePost, successRecipe);

  // 수정
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
