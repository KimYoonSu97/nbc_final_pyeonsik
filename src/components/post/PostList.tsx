import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'src/api/posts';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';
import PostCards from '../renderPosts/PostCards';

const PostList = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    refetchOnMount: false,
    staleTime: Infinity
  });

  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    // error 검사 필요
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  const posts = data?.data as Post[];
  console.log(posts);

  return <PostCards posts={posts} />;
};

export default PostList;

export const S = {
  PostBox: styled.div`
    cursor: pointer;
    border: 1px solid black;
  `
};
