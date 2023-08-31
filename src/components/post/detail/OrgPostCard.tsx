import React from 'react';
import { useNavigate } from 'react-router';
import { Post } from 'src/types/types';
import { S } from 'src/components/post/style/StyledOrgPostCard';
import { IconOrgPost } from 'src/components/icons';

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
          <IconOrgPost />
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
