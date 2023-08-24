import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Post } from 'src/types/types';
import { postsAtom } from '../FetchPosts';
import { likesAtom } from '../FetchPosts';
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

const RealTimeCombo = () => {
  // Jotai의 useAtom을 사용해서 전역선언한 Posts 데이터와 Likes 데이터를 가져오기
  const [posts] = useAtom(postsAtom);
  const [likes] = useAtom(likesAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  console.log('posts', posts);
  console.log('likes', likes);

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
    <RealTimeContainer>
      <HeadTitle>지금 인기있는 편식 조합</HeadTitle>
      <PostContainer>
        {filteredPosts.map((post, index) => (
          <PostCard key={post.id}>
            <Rank isFirst={index === 0}>{index + 1}</Rank>
            <ImageWrapper>{post.img && <Image src={post.img} alt={'1'} />}</ImageWrapper>
            <Title>{post.title}</Title>
            {/* {post.likesCount} */}
          </PostCard>
        ))}
      </PostContainer>
    </RealTimeContainer>
  );
};

export default RealTimeCombo;
