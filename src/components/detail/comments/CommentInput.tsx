import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';

import useLoginUserId from 'src/hooks/useLoginUserId';
import useCommentMutate from 'src/hooks/useCommentMutate';
import styled from 'styled-components';
import { IconCommentInput } from 'src/components/icons';
import { NON_MEMBER } from 'src/utility/message';
import { FlexBox, FlexBoxAlignCenter } from 'src/styles/styleBox';
import { toast } from 'react-toastify';

interface Props {
  type: string;
  commentId?: any;
  prevComment?: string;
  setIsEditComment?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ type, commentId, prevComment, setIsEditComment }: Props) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const location = useLocation();
  const userId = useLoginUserId();
  const { id: postId } = useParams();

  const { updateCommentButton, WriteCommentButton } = useCommentMutate(postId!);

  const functionChanger = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'post') {
      return addComment();
    } else if (type === 'edit') {
      return updateComment();
    }
  };

  // 만약 prevComment가 프롭스로 내려왔다면 그건 수정이라는뜻
  useEffect(() => {
    setComment(prevComment!);
  }, [prevComment]);

  //댓글 작성 함수
  const addComment = () => {
    // 유저아이디가 없을때 => 로그인 하지 않았을 떄
    if (!userId) {
      toast(NON_MEMBER);
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    }
    WriteCommentButton(userId, postId!, comment);
    setComment('');
  };

  //댓글 수정 함수
  const updateComment = () => {
    updateCommentButton(commentId, comment);
    setIsEditComment!(false);
  };

  return (
    <S.CommentInputForm as="form" onSubmit={functionChanger}>
      <S.CommentInput
        placeholder="댓글을 남겨보세요!"
        type="text"
        value={comment || ''}
        onChange={(e) => setComment(e.target.value)}
      />
      <S.CommentInputAddButton>
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

    color: var(--neutral-500, #667085);

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  CommentInputAddButton: styled.button``
};
