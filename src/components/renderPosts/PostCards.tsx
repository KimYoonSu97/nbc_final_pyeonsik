import React from 'react';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';
import PostForMain from './PostForMain';
import { useLocation } from 'react-router';
import NoSearchResult from '../search/NoSearchResult';

interface PostListProps {
  posts: Post[];
}

const PostCards = ({ posts }: PostListProps) => {
  const location = useLocation();
  console.log(location);
  console.log(posts);

  if (posts?.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <S.Area>
      {posts &&
        posts?.map((item: Post) => {
          return <PostForMain key={item.id} item={item} />;
        })}
    </S.Area>
  );
};

export default PostCards;

const S = {
  Area: styled.div`
    margin-top: 40px;
  `
};
