import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { Post } from 'src/types/types';
import {
  RealTimeContainer,
  PostContainer,
  PostCard,
  Title,
  Body,
  Image,
  ImageWrapper,
  HeadTitle,
  Rank
} from '../StyledSideBar';
import { postsAtom } from '../FetchPosts';

const RealTimeCombo = () => {
  //Jotai의 useAtom을 사용해서 전역선언한 Posts데이터를 가져오기
  const [posts] = useAtom(postsAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //가져온 포스트 목록에서 likes의 길이 순으로 정렬해서 좋아요 순 5개까지 디스플레이
  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);
    setFilteredPosts(sortedPosts);
  }, [posts]);

  return (
    <RealTimeContainer>
      <HeadTitle>지금 인기있는 편식 조합</HeadTitle>
      <PostContainer>
        {filteredPosts.map((post, index) => (
          <PostCard key={post.id}>
            <Rank isFirst={index === 0}>{index + 1}</Rank>
            <ImageWrapper>
              <Image src={post.img} alt={post.title} />
            </ImageWrapper>
            <Title>{post.title}</Title>
            {/* <Body>{post.body}</Body> */}
            {/* {post.likes.length} */}
          </PostCard>
        ))}
      </PostContainer>
    </RealTimeContainer>
  );
};

export default RealTimeCombo;
