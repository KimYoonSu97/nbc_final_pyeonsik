import React from 'react';
import { Post } from 'src/types/types';

interface OrgPostCardProps {
  orgPost: Post;
  orgUserNickname: string;
}

const OrgPostCard = ({ orgPost, orgUserNickname }: OrgPostCardProps) => {
  return (
    <div>
      인용 게시글
      <div>{orgPost.title}</div>
      <pre dangerouslySetInnerHTML={{ __html: orgPost.body }} />
      <div>{orgUserNickname}</div>
      <div>{orgPost.created_at}</div>
    </div>
  );
};

export default OrgPostCard;
