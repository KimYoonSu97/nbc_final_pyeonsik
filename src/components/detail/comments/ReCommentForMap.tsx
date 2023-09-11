import React, { useState } from 'react';
import { styled } from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import CommentUserInfo from './CommentUserInfo';
import ReCommentLikes from './ReCommentLikes';
import ReCommentInput from './ReCommentInput';
import useReCommentMutate from 'src/hooks/useReCommentMutate';
import CreatedAt from 'src/utility/CreatedAt';
import { FlexBox, FlexBoxAlignCenter } from 'src/styles/styleBox';

interface CommentDataType {
  comment: string;
  created_at: string;
  id: string;
  postId: string;
  userId: string;
  users: {
    profileImg: string;
    nickname: string;
    level: string;
  };
}

interface Props {
  reComment: CommentDataType;
  parentId: string;
}
const ReCommentForMap = ({ reComment, parentId }: Props) => {
  const userId = useLoginUserId();
  // 토글 state
  const [isEditComment, setIsEditComment] = useState(false);

  const { deleteReCommentButton } = useReCommentMutate(parentId);

  return (
    <>
      <S.CommentArea>
        <S.UpWrapper>
          {/* 유저영역 */}
          <S.UserArea>
            <CommentUserInfo users={reComment.users} />
            <S.Time>·</S.Time>
            <S.Time>
              <CreatedAt createdAt={reComment.created_at} />
            </S.Time>
            <S.ButtonArea>
              <ReCommentLikes commentId={reComment.id} />
            </S.ButtonArea>
          </S.UserArea>
        </S.UpWrapper>
        <S.LowWrapper>
          {isEditComment ? (
            <ReCommentInput
              type={'edit'}
              commentId={reComment.id}
              parent_commentId={parentId}
              prevComment={reComment.comment}
              setIsEditComment={setIsEditComment}
            />
          ) : (
            <S.CommentBody>{reComment.comment}</S.CommentBody>
          )}
        </S.LowWrapper>
        {userId === reComment.userId && (
          <S.EditButtonArea>
            <S.EditButton onClick={() => setIsEditComment(!isEditComment)}>수정</S.EditButton>
            <S.EditButton onClick={() => deleteReCommentButton(reComment.id)}>| 삭제</S.EditButton>
          </S.EditButtonArea>
        )}
      </S.CommentArea>
    </>
  );
};

export default ReCommentForMap;

const S = {
  CommentArea: styled.div``,
  UpWrapper: styled.div``,
  LowWrapper: styled(FlexBox)`
    gap: 4px;
    margin-left: 45px;
  `,
  ButtonArea: styled(FlexBoxAlignCenter)`
    margin-left: auto;
  `,
  UserArea: styled(FlexBoxAlignCenter)``,
  ProfileImg: styled.img`
    width: 36px;
    height: 36px;
    border-radius: 100px;
  `,

  Nickname: styled.div`
    margin-left: 4px;
    color: var(--font-black, var(--Black, #242424));

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  Time: styled.div`
    margin-left: 4px;

    color: #737373;

    /* body-small */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `,
  ReCommentToggle: styled.div`
    margin-right: 12px;
    color: var(--neutral-500, #667085);

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  LikeButton: styled.div``,
  LikeNum: styled.div`
    color: var(--neutral-500, #667085);
    text-align: right;

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  CommentBody: styled.div`
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--neutral-100, #f2f4f7);
    width: 100%;
    background-color: white;

    color: var(--font-black, #242424);

    /* body-medium */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  `,
  ReCommentAddButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    width: 20px;
    height: 20px;
    border-radius: 125px;
    border: 0.625px solid var(--neutral-500, #667085);
    background: var(--neutral-100, #f2f4f7);
  `,
  EditButtonArea: styled.div`
    display: flex;
    justify-content: flex-end;

    align-items: center;
    text-align: center;

    height: 20px;
    padding-top: 3px;

    /* body-small */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `,
  EditButton: styled.div`
    cursor: pointer;

    display: flex;
    width: 28px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--neutral-400, var(--neutral-400, #98a2b3));
  `
};
