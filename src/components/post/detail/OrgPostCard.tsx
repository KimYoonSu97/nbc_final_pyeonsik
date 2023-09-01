import React from 'react';
import { useNavigate } from 'react-router';
import { Post } from 'src/types/types';
import { S } from 'src/components/post/style/StyledOrgPostCard';
import { IconOrgPost } from 'src/components/icons';
import CreatedAt from 'src/function/CreatedAt';

interface OrgPostCardProps {
  orgPost: Post;
}

const OrgPostCard = ({ orgPost }: OrgPostCardProps) => {
  const navigate = useNavigate();

  const clickOrgPost = () => {
    navigate(`/detail/${orgPost.id}`);
  };

  return (
    <S.OrgArea>
      <S.OrgTextBox>
        <S.OrgIcon>
          <IconOrgPost />
        </S.OrgIcon>
        <S.OrgText>원글</S.OrgText>
      </S.OrgTextBox>
      <S.OrgContentsBox onClick={clickOrgPost}>
        <S.OrgTitle>{orgPost.title}</S.OrgTitle>
        <S.OrgInfoBox>
          {orgPost.userId.nickname}
          <div>·</div>
          <CreatedAt createdAt={orgPost.created_at} />
        </S.OrgInfoBox>
      </S.OrgContentsBox>
    </S.OrgArea>
  );
};

export default OrgPostCard;
