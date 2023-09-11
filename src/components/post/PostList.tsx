import React, { useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { Post } from 'src/types/types';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
import PostCards from '../renderPosts/PostCards';
import { getPosts } from 'src/api/mainPage/getPostInfinity';
import { InfinityPostList } from 'src/types/types';

const PostList = () => {
  const location = useLocation();
  const constraintsRef = useRef(null);
  let pageKey: string;
  if (location.search === '') {
    pageKey = '/';
  } else {
    pageKey = location.search;
  }

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<InfinityPostList>({
    queryKey: [`postList`, pageKey],
    queryFn: ({ pageParam }) => getPosts(pageParam, pageKey),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    }
  });

  const postList = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);
  console.log(posts);

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  return (
    <>
      <PostCards posts={postList as Post[]} />
      <S.LoadingBox ref={ref} />
    </>
  );
};

export default PostList;

export const S = {
  LoadingBox: styled.div`
    background-color: yellow;
    width: 200px;
    height: 200px;
  `
};
