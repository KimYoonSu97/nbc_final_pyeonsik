import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { Post } from 'src/types/types';
import {
  NewReviewContainer,
  PostContainer,
  PostCard,
  Title,
  Body,
  Image,
  ImageWrapper,
  HeadTitle
} from './StyledSideBar';
import { postsAtom } from './FetchPosts';

const NewReview = () => {
  //Jotai의 useAtom을 사용해서 전역선언한 Posts데이터를 가져오기
  const [posts] = useAtom(postsAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //컴포넌트 마운트 시 패치해 온 posts 중 시간순으로 정렬해서 5개 디스플레이
  useEffect(() => {
    const sortedPosts = [...posts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
    setFilteredPosts(sortedPosts);
  }, [posts]);

  return (
    <>
      <NewReviewContainer>
        <HeadTitle>편의점 신제품 리뷰</HeadTitle>
        <PostContainer>
          {filteredPosts.map((post) => (
            <PostCard key={post.id}>
              <ImageWrapper>
                <Image src={post.img} alt={post.title} />
              </ImageWrapper>
              <Title>{post.title}</Title>
              {/* <Body>{post.body}</Body> */}
              {/* {post.created_at} */}
            </PostCard>
          ))}
        </PostContainer>
      </NewReviewContainer>
    </>
  );
};

export default NewReview;
