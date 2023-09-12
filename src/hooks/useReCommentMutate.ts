import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReCommentData, updateReCommentData, writeReCommentData } from 'src/api/ReComment';
import { toast } from 'react-toastify';

const useReCommentMutate = (parent_commentId: string) => {
  const queryclient = useQueryClient();

  const success = {
    onSuccess: () => {
      queryclient.invalidateQueries(['reComment', parent_commentId]);
    }
  };

  const writeReCommentButton = (userId: string, postId: string, reComment: string, parent_commentId: string) => {
    if (reComment.trim() === '') {
      toast('댓글을 작성해 주세요.');
      return;
    }
    const newReComment = {
      comment: reComment,
      parent_commentId,
      postId,
      userId
    };

    writeReCommentMutation.mutate(newReComment);
  };

  //댓글 삭제 버튼
  const deleteReCommentButton = (id: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteReCommentMutation.mutate(id);
    } else {
      toast('삭제가 취소되었습니다.');
    }
  };

  //댓글 수정
  const updateReCommentButton = (id: string, updateComment: string) => {
    if (window.confirm('댓글을 수정 하시겠습니까?')) {
      updateReCommentMutation.mutate({ id, comment: updateComment });
    } else {
      toast('수정이 취소되었습니다.');
    }
  };

  const writeReCommentMutation = useMutation(writeReCommentData, success);
  const deleteReCommentMutation = useMutation(deleteReCommentData, success);
  const updateReCommentMutation = useMutation(updateReCommentData, success);

  return {
    writeReCommentMutation,
    deleteReCommentMutation,
    updateReCommentMutation,
    writeReCommentButton,
    updateReCommentButton,
    deleteReCommentButton
  };
};
export default useReCommentMutate;
