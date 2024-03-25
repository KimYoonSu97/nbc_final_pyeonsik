import React, { useState } from 'react';
import { IconAddReComment } from 'src/components/icons';
import { styled } from 'styled-components';
import useLoginUserId from 'src/hooks/useLoginUserId';
import useCommentMutate from 'src/hooks/useCommentMutate';
import ReCommentInput from './ReCommentInput';
import CommentLikes from './CommentLikes';
import CommentInput from './CommentInput';
import ReCommentForMap from './ReCommentForMap';
import { getReCommentDataByCommentId } from 'src/api/ReComment';
import { useQuery } from '@tanstack/react-query';
import CommentUserInfo from './CommentUserInfo';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ProgressCircle from 'src/components/ProgressCircle';

dayjs.locale('ko');

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
  comment: CommentDataType;
}

const CommentForMap = ({ comment }: Props) => {
  const userId = useLoginUserId();

  const [isEditComment, setIsEditComment] = useState(false);
  const [isOpenReComment, setIsOpenReComment] = useState(false);
  const [isOpenReCommentInput, setIsOpenReCommentInput] = useState(false);

  const { deleteCommentButton } = useCommentMutate(comment.postId);

  const { data: reCommentData, isLoading: reCommentIsLoading } = useQuery({
    queryKey: ['reComment', comment.id],
    queryFn: () => getReCommentDataByCommentId(comment.id!),
    enabled: comment.id ? true : false,
    refetchOnWindowFocus: false
  });

  const month = dayjs(comment.created_at).add(1, 'month').get('M');
  const date = dayjs(comment.created_at).get('D');

  if (reCommentIsLoading) {
    return <ProgressCircle />;
  }
  console.log('댓글 렌더링')
  return (
    <>
      <S.CommentArea>
        <S.UpWrapper>
          <S.UserArea>
            <CommentUserInfo users={comment.users} />
            <S.Time>·</S.Time>
            <S.Time>
              {month}월 {date}일
            </S.Time>
            <S.ButtonArea>
              {reCommentData!.count !== 0 && (
                <S.ReCommentToggle onClick={() => setIsOpenReComment(!isOpenReComment)}>
                  {reCommentData!.count}개의 답글보기
                </S.ReCommentToggle>
              )}
              <CommentLikes commentId={comment.id} />
            </S.ButtonArea>
          </S.UserArea>
        </S.UpWrapper>
        <S.LowWrapper>
          {userId ? (
            <S.ReCommentAddButton
              onClick={() => {
                setIsOpenReCommentInput(!isOpenReCommentInput);
                setIsOpenReComment(true);
              }}
            >
              <IconAddReComment />
            </S.ReCommentAddButton>
          ) : (
            <S.ReCommentAddButtonEmpty />
          )}
          {isEditComment ? (
            <CommentInput
              type={'edit'}
              commentId={comment.id}
              prevComment={comment.comment}
              setIsEditComment={setIsEditComment}
            />
          ) : (
            <S.CommentBody>{comment.comment}</S.CommentBody>
          )}
        </S.LowWrapper>
        {userId === comment.userId && (
          <S.EditButtonArea>
            <S.EditButton onClick={() => setIsEditComment(!isEditComment)}>
              {isEditComment ? '취소' : '수정'}
            </S.EditButton>
            <S.EditButton onClick={() => deleteCommentButton(comment.id)}>| 삭제</S.EditButton>
          </S.EditButtonArea>
        )}
        {isOpenReCommentInput && (
          <S.ReCommentInputArea>
            <ReCommentInput type={'post'} commentId={comment.id} setIsOpenReCommentInput={setIsOpenReCommentInput} />
          </S.ReCommentInputArea>
        )}
        {isOpenReComment && (
          <S.ReCommentRenderArea>
            {reCommentData?.data?.map((reComment: CommentDataType) => {
              return (
                <ReCommentForMap key={reComment.id} parentId={comment.id} reComment={reComment as CommentDataType} />
              );
            })}
          </S.ReCommentRenderArea>
        )}
      </S.CommentArea>
    </>
  );
};

export default CommentForMap;

const S = {
  CommentArea: styled.div``,
  UpWrapper: styled.div``,
  LowWrapper: styled(FlexBox)`
    gap: 4px;
    margin-left: 25px;
    align-items: center;
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

    ${styleFont.bodyMedium}
  `,
  Time: styled.div`
    margin-left: 4px;

    color: #737373;

    ${styleFont.bodySmall}
  `,
  ReCommentToggle: styled.div`
    cursor: pointer;

    margin-right: 12px;
    color: var(--neutral-500, #667085);

    ${styleFont.bodyMedium}
  `,
  LikeButton: styled.div``,
  LikeNum: styled.div`
    color: var(--neutral-500, #667085);
    text-align: right;

    ${styleFont.bodyMedium}
  `,
  CommentBody: styled.div`
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--neutral-100, #f2f4f7);
    width: 100%;
    background-color: white;

    color: var(--font-black, #242424);

    ${styleFont.bodyMedium}
  `,
  ReCommentAddButton: styled(FlexBoxCenter)`
    cursor: pointer;

    margin-top: auto;
    width: 20px;
    height: 20px;
    border-radius: 125px;
    border: 0.625px solid var(--neutral-500, #667085);
    background: var(--neutral-100, #f2f4f7);
  `,
  ReCommentAddButtonEmpty: styled(FlexBoxCenter)`
    margin-top: auto;
    width: 20px;
    height: 20px;
    border-radius: 125px;
  `,
  EditButtonArea: styled(FlexBoxAlignCenter)`
    justify-content: flex-end;

    text-align: center;

    ${styleFont.bodySmall}
  `,
  EditButton: styled(FlexBoxJustifyCenter)`
    cursor: pointer;

    width: 28px;
    height: 20px;
    padding-top: 3px;
    flex-direction: column;
    flex-shrink: 0;
    color: var(--neutral-400, var(--neutral-400, #98a2b3));
  `,
  ReCommentArea: styled.div``,
  ReCommentInputArea: styled.div`
    margin-top: 16px;
  `,
  ReCommentRenderArea: styled(FlexBox)`
    margin-top: 24px;
    margin-left: 50px;
    flex-direction: column;
    gap: 10px;
  `
};
