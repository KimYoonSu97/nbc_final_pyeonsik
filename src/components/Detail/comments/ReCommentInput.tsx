import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useReCommentMutate from 'src/hooks/useReCommentMutate';
import styled from 'styled-components';
import { IconCommentInput } from 'src/components/icons';

interface Props {
  type: string;
  commentId?: string;
  parent_commentId?: string;
  prevComment?: string;
  setIsEditComment?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenReCommentInput?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReCommentInput = ({
  type,
  commentId,
  prevComment,
  parent_commentId,
  setIsEditComment,
  setIsOpenReCommentInput
}: Props) => {
  const { id: postId } = useParams<string>();
  const [reComment, setReComment] = useState('');
  const location = useLocation();
  const userId = useLoginUserId();

  const { writeReCommentButton, updateReCommentButton } = useReCommentMutate(commentId!);

  const functionChanger = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'post') {
      return addReComment();
    } else if (type === 'edit') {
      return updateReComment();
    }
  };

  // 만약 prevComment가 프롭스로 내려왔다면 그건 수정이라는뜻
  useEffect(() => {
    setReComment(prevComment!);
  }, [prevComment]);

  //댓글 작성 함수
  const addReComment = () => {
    // 유저아이디가 없을때 => 로그인 하지 않았을 떄
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      return <Navigate to="/login" state={{ backgroundLocation: location }} />;
    }
    const parent_commentId = commentId;
    writeReCommentButton(userId, postId!, reComment, parent_commentId!);
    setReComment('');
    setIsOpenReCommentInput!(false);
  };

  // 댓글 수정함수
  const updateReComment = () => {
    updateReCommentButton(commentId!, reComment);
    setIsEditComment!(false);
  };

  return (
    <S.CommentInputForm onSubmit={functionChanger}>
      <S.CommentInput
        placeholder="댓글을 남겨보세요!"
        type="text"
        value={reComment || ''}
        onChange={(e) => setReComment(e.target.value)}
      />
      <S.CommentInputAddButton>
        <IconCommentInput />
      </S.CommentInputAddButton>
    </S.CommentInputForm>
  );
};

export default ReCommentInput;

const S = {
  CommentInputArea: styled.div`
    display: flex;
    gap: 8px;
    margin: 16px 0 0 50px;
  `,
  CommentInPutProfile: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100px;
    background: lightgray;
  `,
  CommentInputForm: styled.form`
    width: 100%;
    display: flex;
    align-items: center;
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
