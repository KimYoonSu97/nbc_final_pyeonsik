import React from 'react';
import { useQuery } from 'react-query';
import { getPostLike } from 'src/api/postLikes';

interface PostLikeProps {
  id: string;
}

const PostLike = ({ id }: PostLikeProps) => {
  return <button>like</button>;
};

export default PostLike;
