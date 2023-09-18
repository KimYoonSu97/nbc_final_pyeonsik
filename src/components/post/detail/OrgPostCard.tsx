import React from 'react';
import { useNavigate } from 'react-router';
import { Post } from 'src/types/types';
import CreatedAt from 'src/utility/CreatedAt';
import { IconOrgPost } from 'src/components/icons';
import styled from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';
import { styleFont } from 'src/styles/styleFont';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface OrgPostCardProps {
  orgPost: Post;
}

const OrgPostCard = ({ orgPost }: OrgPostCardProps) => {
  const navigate = useNavigate();

  const clickOrgPost = () => {
    orgPost && navigate(`/detail/${orgPost.id}`);
  };

  const month = dayjs(orgPost.created_at).add(1, 'month').get('M');
  const date = dayjs(orgPost.created_at).get('D');

  return (
    <S.OrgContainer>
      <S.OrgTextBox>
        <S.OrgIcon>
          <IconOrgPost />
        </S.OrgIcon>
        <S.OrgText>인용 게시글</S.OrgText>
      </S.OrgTextBox>
      <S.OrgContentsBox onClick={clickOrgPost}>
        {orgPost ? (
          <>
            <S.OrgTitle>{orgPost.title ? orgPost.title : '제목 없는 게시물'}</S.OrgTitle>
            <S.OrgInfoBox>
              {orgPost.userId.nickname}
              <div>·</div>
              {month}월 {date}일
            </S.OrgInfoBox>
          </>
        ) : (
          <div>해당 게시글이 삭제되었습니다.</div>
        )}
      </S.OrgContentsBox>
    </S.OrgContainer>
  );
};

export default OrgPostCard;

export const S = {
  OrgContainer: styled.div`
    max-width: 950px;
    margin: 20px auto;
    padding: 16px 22px;

    background: #fff;
    border-radius: 10px;
  `,

  OrgTextBox: styled(FlexBoxAlignCenter)`
    margin: 0px 0px 10px 0px;
    gap: 4px;
  `,

  OrgIcon: styled.div`
    width: 20px;
    height: 20px;
  `,

  OrgText: styled.div`
    color: var(--font-black, var(--Black, #242424));

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  `,

  OrgContentsBox: styled(FlexBoxJustifyCenter)`
    height: 80px;
    padding: 16px;
    gap: 8px;
    border-radius: 10px;
    border: 1px solid var(--neutral-300, #d0d5dd);

    flex-direction: column;
    cursor: pointer;

    &:hover {
      border: 1px solid var(--neutral-400, #98a2b3);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    }
  `,

  OrgTitle: styled.div`
    width: 758px;

    color: var(--font-black, var(--black, #242424));
    ${styleFont.labelLarge}
  `,

  OrgInfoBox: styled(FlexBoxAlignCenter)`
    gap: 4px;

    color: var(--font-black, var(--black, #242424));
    ${styleFont.bodySmall}
  `
};
