import React, { useEffect } from 'react';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';
import PostForMain from './PostForMain';
import { useLocation } from 'react-router';
import NoSearchResult from '../search/NoSearchResult';
import NoPost from '../mypage/NoPost';
import { useAtom } from 'jotai';
import { isLoadingAtom } from 'src/pages/Main';
import BoardAlert from '../popUp/BoardAlert';

interface PostListProps {
  posts: Post[];
}

const PostCards = ({ posts }: PostListProps) => {
  const [_, setIsLoading] = useAtom(isLoadingAtom);
  const location = useLocation();

  useEffect(() => {
    if (location.search === '?=common') {
      const checker = localStorage.getItem('boardInfoNever');
      if (checker === null) BoardAlert();
    }
  }, []);

  useEffect(() => {
    if (posts) setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    if (!posts) setIsLoading(true);
  }, [posts]);

  if (location.pathname !== '/mypage/mypost' && posts?.length === 0) {
    return <NoSearchResult />;
  }
  if (location.pathname === '/mypage/mypost' && posts?.length === 0) {
    return <NoPost />;
  }

  return (
    <S.Area>
      {posts! &&
        posts?.map((item: Post) => {
          return <PostForMain key={item!.id!} item={item} />;
        })}
    </S.Area>
  );
};

export default PostCards;

const S = {
  Area: styled.div`
    margin-top: 30px;
  `
};
