import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WriteCommentData, deleteCommentData, updateCommentData } from 'src/api/comment';
import { toast } from 'react-toastify';

interface Props {
  postId?: string;
}

const useCommentMutate = (postId?: string) => {
  const queryclient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryclient.invalidateQueries(['comment', postId]);
      queryclient.invalidateQueries(['commentCount', postId]);
    }
  };
  const updateSuccess = {
    onSuccess: () => {
      queryclient.invalidateQueries(['comment', postId]);
    }
  };

  const WriteCommentButton = (userId: string, postId: string, comment: string) => {
    if (comment.trim() === '') {
      toast('댓글을 작성해 주세요.');
      return;
    }
    writeCommentMutation.mutate({ comment, userId, postId });
  };

  const deleteCommentButton = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(id);
    } else {
      toast('삭제가 취소되었습니다.');
    }
  };

  const updateCommentButton = (id: string, updateComment: string) => {
    if (window.confirm('댓글을 수정 하시겠습니까?')) {
      const newComment = {
        id,
        comment: updateComment
      };
      updateCommentMutation.mutate(newComment);
    } else {
      toast('수정이 취소되었습니다.');
    }
  };

  const writeCommentMutation = useMutation(WriteCommentData, success);
  const deleteCommentMutation = useMutation(deleteCommentData, success);
  const updateCommentMutation = useMutation(updateCommentData, updateSuccess);

  return {
    writeCommentMutation,
    deleteCommentMutation,
    updateCommentMutation,
    updateCommentButton,
    deleteCommentButton,
    WriteCommentButton
  };
};
export default useCommentMutate;
