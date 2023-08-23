import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getPosts } from 'src/api/posts';
import { Post } from 'src/types/types';
import { styled } from 'styled-components';
import PostCards from '../renderPosts/PostCards';

const PostList = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts() });
  if (isLoading) {
    return <p>Loading…</p>;
  }
  if (data?.error) {
    return <p>Error</p>;
  }
  if (data?.data.length === 0) {
    return <p>none</p>;
  }
  const posts = data?.data as Post[];

  // 게시글 최신순 정렬
  posts.sort((a: Post, b: Post) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

  return (
    <PostCards data={posts}></PostCards>
    // <div>
    //   {posts.map((post) => (
    //     <S.PostBox key={post.id} >
    //       <div>{post.id}</div>
    //       <div>{post.title}</div>
    //       <div>{post.body}</div>
    //     </S.PostBox>
    //   ))}
    // </div>
  );
};

export default PostList;

export const S = {
  PostBox: styled.div`
    cursor: pointer;
    border: 1px solid black;
  `
};
