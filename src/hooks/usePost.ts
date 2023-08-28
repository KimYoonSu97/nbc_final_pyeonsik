import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost, addRecipePost, tagUpdatePost } from 'src/api/posts';

const useMutate = () => {
  const queryClient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  };

  const addPostMutate = useMutation(addPost, success);

  //입력받는 데이터 형식이 달라졌기에 하나 더 선언했습니다!
  const addRecipePostMutate = useMutation(addRecipePost, success);

  const updatePostMutate = useMutation(updatePost, success);

  //입력받는 데이터 형식이 달라졌기에 하나 더 선언했습니다!
  const tagUpdatePostMutate = useMutation(tagUpdatePost, success);

  const deletePostMutate = useMutation(deletePost, success);

  return { addPostMutate, updatePostMutate, deletePostMutate, addRecipePostMutate, tagUpdatePostMutate };
};

export default useMutate;
