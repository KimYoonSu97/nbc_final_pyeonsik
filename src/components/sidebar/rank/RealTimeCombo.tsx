import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Post } from 'src/types/types';
import { postsAtom } from '../FetchPosts';
import { likesAtom } from '../FetchPosts';
import { styled } from 'styled-components';

const RealTimeCombo = () => {
  // Jotai의 useAtom을 사용해서 전역선언한 Posts 데이터와 Likes 데이터를 가져오기
  const [posts] = useAtom(postsAtom);
  const [likes] = useAtom(likesAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // 가져온 포스트 목록에서 likes의 길이 순으로 정렬해서 좋아요 순 5개까지 디스플레이
  useEffect(() => {
    const postsWithLikesCount = posts.map((post) => {
      const postLikes = likes.filter((like) => like.postId === post.id);
      const likesCount = postLikes.length;
      return { ...post, likesCount };
    });

    const sortedPosts = [...postsWithLikesCount].sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
    setFilteredPosts(sortedPosts);
  }, [posts, likes]);

  return (
    <S.ContentsArea>
      {/* <>지금 인기있는 편식 조합</> */}
      {filteredPosts.map((post, index) => (
        <S.ContentWrapper key={post.id}>
          <S.RankNum $isfirst={index === 0}>{index + 1}</S.RankNum>
          <S.ImageBox $url={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.tagimage}`}></S.ImageBox>
          <S.PostTitle>{post.title}</S.PostTitle>
          {/* <Rank ></Rank> */}
          {/*<ImageWrapper>
            
          </ImageWrapper>
          <Title></Title>
          {post.likesCount} */}
        </S.ContentWrapper>
      ))}
    </S.ContentsArea>
  );
};

export default RealTimeCombo;

const S = {
  ContentsArea: styled.div`
    display: flex;
    width: 296px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  ContentWrapper: styled.div`
    width: 100%;
    padding: 6px 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  RankNum: styled.div<{
    $isfirst?: boolean;
  }>`
    width: 18px;
    height: 18px;
    background-color: ${({ $isfirst }) => ($isfirst ? '#d9d9d9' : 'white')};
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* body-small */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    color: ${({ $isfirst }) => ($isfirst ? 'white' : '#d9d9d9')};
  `,
  ImageBox: styled.div<{ $url: string }>`
    width: 48px;
    height: 48px;
    background-image: ${(props) => `url(${props.$url})`};
    background-color: #d9d9d9;
    border-radius: 4px;
  `,
  PostTitle: styled.div`
    color: #000;
    /* title-small */
    padding-top: 2px;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
  `
};
