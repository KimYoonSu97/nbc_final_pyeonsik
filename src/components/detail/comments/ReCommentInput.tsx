import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useReCommentMutate from 'src/hooks/useReCommentMutate';
import styled from 'styled-components';
import { IconCommentInput } from 'src/components/icons';
import { NON_MEMBER } from 'src/utility/guide';
import { styleFont } from 'src/styles/styleFont';
import { updateFirstCommentBadge } from 'src/api/badge';
import { toast } from 'react-toastify';
import { getUserData } from 'src/api/userLogin';
import { useQueries } from '@tanstack/react-query';

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
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useLoginUserId();

  const [{ data: userData, isLoading: userIsLoading, isError: userIsError }] = useQueries({
    queries: [
      {
        queryKey: ['loginUser'],
        queryFn: () => getUserData(userId),
        enabled: userId ? true : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity
      }
    ]
  });

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
      toast(NON_MEMBER);
      navigate('/login', { state: { backgroundLocation: location } });
      return;
    }
    const parent_commentId = commentId;
    writeReCommentButton(userId, postId!, reComment, parent_commentId!);
    setReComment('');
    updateFirstCommentBadge(userId);
    setIsOpenReCommentInput!(false);
  };

  // 댓글 수정함수
  const updateReComment = () => {
    updateReCommentButton(commentId!, reComment);
    setIsEditComment!(false);
  };

  return (
    <S.Container>
      <S.CommentInPutProfile src={userData?.data?.profileImg}></S.CommentInPutProfile>{' '}
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
    </S.Container>
  );
};

export default ReCommentInput;

const S = {
  Container: styled.div`
    display: flex;
    margin-left: 25px;
    align-items: center;
    /* margin: 16px 0 50px 0; */
  `,
  CommentInPutProfile: styled.img`
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 100px;
    background: lightgray;
  `,
  CommentInputForm: styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    background: var(--neutral-100, #f2f4f7);
    border-radius: 10px;
    margin-left: 16px;
    /* margin: 16px 0 50px; */
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

    ${styleFont.bodyMedium}
  `,
  CommentInputAddButton: styled.button`
    background: transparent;
  `
};
