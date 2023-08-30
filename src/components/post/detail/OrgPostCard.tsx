import React from 'react';
import { Post } from 'src/types/types';
import { ReactComponent as OrgPost } from 'src/components/post/svg/OrgPost.svg';
import { S } from './StyledOrgPostCard';
import { useNavigate } from 'react-router';

interface OrgPostCardProps {
  orgPost: Post;
  orgUserNickname: string;
}

const OrgPostCard = ({ orgPost, orgUserNickname }: OrgPostCardProps) => {
  const navigate = useNavigate();

  const clickOrgPost = () => {
    navigate(`/detail/${orgPost.id}`);
  };

  return (
    <S.OrgArea>
      <S.OrgTextBox>
        <S.OrgIcon>
          <OrgPost />
        </S.OrgIcon>
        <S.OrgText>원글</S.OrgText>
      </S.OrgTextBox>
      <S.OrgContentsBox onClick={clickOrgPost}>
        <S.OrgTitle>{orgPost.title}</S.OrgTitle>
        <S.OrgInfoBox>
          {orgUserNickname}
          <div>·</div>
          {orgPost.created_at}
        </S.OrgInfoBox>
      </S.OrgContentsBox>
    </S.OrgArea>
  );
};

export default OrgPostCard;
