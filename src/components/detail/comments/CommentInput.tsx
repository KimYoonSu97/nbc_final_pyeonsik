import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';

import useLoginUserId from 'src/hooks/useLoginUserId';
import useCommentMutate from 'src/hooks/useCommentMutate';
import styled from 'styled-components';
import { IconCommentInput } from 'src/components/icons';
import { EMAIL_CHECK } from 'src/utility/guide';
import { FlexBox, FlexBoxAlignCenter } from 'src/styles/styleBox';
import { updateFirstCommentBadge } from 'src/api/badge';
import { toast } from 'react-toastify';

interface Props {
  type: string;
  commentId?: any;
  prevComment?: string;
  setIsEditComment?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ type, commentId, prevComment, setIsEditComment }: Props) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>('');
  const location = useLocation();
  const userId = useLoginUserId();
  const { id: postId } = useParams();

  const { updateCommentButton, WriteCommentButton } = useCommentMutate(postId!);

  const functionChanger = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length === 0) {
      toast('댓글을 입력해주세요.');
      return;
    }

    if (type === 'post') {
      return addComment();
    } else if (type === 'edit') {
      return updateComment();
    }
  };

  useEffect(() => {
    setComment(prevComment!);
  }, [prevComment]);

  const addComment = () => {
    if (!userId) {
      toast(EMAIL_CHECK);
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    }
    WriteCommentButton(userId, postId!, comment);
    updateFirstCommentBadge(userId);
    setComment('');
  };

  const updateComment = () => {
    updateCommentButton(commentId, comment);
    setIsEditComment!(false);
  };

  return (
    <S.CommentInputForm as="form" onSubmit={functionChanger}>
      <S.CommentInput
        placeholder="댓글을 남겨보세요!"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <S.CommentInputAddButton type="submit">
        <IconCommentInput />
      </S.CommentInputAddButton>
    </S.CommentInputForm>
  );
};

export default CommentInput;

const S = {
  CommentInputArea: styled(FlexBox)`
    gap: 8px;
  `,
  CommentInPutProfile: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100px;
    background: lightgray;
  `,
  CommentInputForm: styled(FlexBoxAlignCenter)`
    width: 100%;
    background: var(--neutral-100, #f2f4f7);
    border-radius: 10px;
    padding-right: 10px;
  `,
  CommentInput: styled.input`
    width: 100%;
    padding: 8px 0 8px 14px;
    margin-right: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    background: transparent;
    height: 42px;

    color: var(--neutral-500, #667085);

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  CommentInputAddButton: styled.button``
};
