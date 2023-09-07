import React from 'react';
import { useNavigate } from 'react-router';
import { Post } from 'src/types/types';
import CreatedAt from 'src/utility/CreatedAt';
// import { S } from 'src/components/post/style/StyledOrgPostCard';
import { IconOrgPost } from 'src/components/icons';
import styled from 'styled-components';
import { FlexBoxAlignCenter, FlexBoxJustifyCenter } from 'src/styles/styleBox';

interface OrgPostCardProps {
  orgPost: Post;
}

const OrgPostCard = ({ orgPost }: OrgPostCardProps) => {
  const navigate = useNavigate();

  const clickOrgPost = () => {
    orgPost && navigate(`/detail/${orgPost.id}`);
  };

  return (
    <S.OrgArea>
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
                <CreatedAt createdAt={orgPost.created_at} />
              </S.OrgInfoBox>
            </>
          ) : (
            <div>해당 게시글이 삭제되었습니다.</div>
          )}
        </S.OrgContentsBox>
      </S.OrgContainer>
    </S.OrgArea>
  );
};

export default OrgPostCard;

export const S = {
  OrgArea: styled.div`
    margin: 20px 0 108px;

    width: 100%;
    /* margin: 20px 50px; */
  `,
  OrgContainer: styled.div`
    margin: 20px 108px;
    max-width: 950px;
    margin: 0 auto;
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

    /* title-medium */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
  `,

  OrgContentsBox: styled(FlexBoxJustifyCenter)`
    height: 80px;
    padding: 16px;
    gap: 8px;
    border-radius: 10px;
    border: 1px solid var(--neutral-400, #98a2b3);

    flex-direction: column;
    cursor: pointer;
  `,

  OrgTitle: styled.div`
    width: 758px;

    color: var(--font-black, var(--black, #242424));
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  `,

  OrgInfoBox: styled(FlexBoxAlignCenter)`
    gap: 4px;

    color: var(--font-black, var(--black, #242424));
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  `
};
