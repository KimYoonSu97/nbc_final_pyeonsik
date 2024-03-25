import React from 'react';
import UserLevel from 'src/components/header/UserLevel';
import { FlexBox, FlexBoxAlignCenter, FlexBoxCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';
import styled from 'styled-components';

interface Props {
  users: {
    profileImg: string;
    nickname: string;
    level: string;
  };
}

const CommentUserInfo = ({ users }: Props) => {
  return (
    <>
      <S.ProfileImg src={users.profileImg} alt='유저 프로필 이미지' />
      <UserLevel level={users.level} />
      <S.Nickname>{users.nickname}</S.Nickname>
    </>
  );
};

export default CommentUserInfo;

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
    margin-right: 13px;
  `,

  Nickname: styled.div`
    margin-left: 4px;
    color: var(--font-black, var(--Black, #242424));

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  Time: styled.div`
    margin-left: 4px;

    color: #737373;

    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
  ReCommentToggle: styled.div`
    margin-right: 12px;
    color: var(--neutral-500, #667085);

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  LikeButton: styled.div``,
  LikeNum: styled.div`
    color: var(--neutral-500, #667085);
    text-align: right;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  CommentBody: styled.div`
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--neutral-100, #f2f4f7);
    width: 100%;
    background-color: white;

    color: var(--font-black, #242424);

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  ReCommentAddButton: styled(FlexBoxCenter)`
    margin-top: auto;
    width: 20px;
    height: 20px;
    border-radius: 125px;
    border: 0.625px solid var(--neutral-500, #667085);
    background: var(--neutral-100, #f2f4f7);
  `,
  EditButtonArea: styled(FlexBoxAlignCenter)`
    justify-content: flex-end;
    text-align: center;

    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
  EditButton: styled(FlexBoxJustifyCenter)`
    width: 28px;
    height: 40px;
    flex-direction: column;
    flex-shrink: 0;
    color: var(--neutral-400, var(--neutral-400, #98a2b3));
  `
};
