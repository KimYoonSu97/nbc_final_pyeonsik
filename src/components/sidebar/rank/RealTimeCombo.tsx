import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Post } from 'src/types/types';
import { postsAtom, likesAtom } from '../FetchPosts';
import { S } from './StyledRealTimeCombo';

const RealTimeCombo = () => {
  const location = useLocation();
  const [posts] = useAtom(postsAtom);
  const [likes] = useAtom(likesAtom);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const postsWithLikesCount = posts.map((post) => {
      const postLikes = likes.filter((like) => like.postId === post.id);
      const likesCount = postLikes.length;
      return { ...post, likesCount };
    });

    const sortedPosts = [...postsWithLikesCount].sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
    setFilteredPosts(sortedPosts);
  }, [posts, likes]);

  const handleDetailClick = (postId: string) => {
    navigate(`/detail/${postId}`, { state: { backgroundLocation: location } });
  };

  return (
    <S.ContentsArea>
      {filteredPosts.map((post, index) => (
        <S.ContentWrapper key={post.id} onClick={() => handleDetailClick(post.id)}>
          <S.RankNum $isfirst={index === 0}>{index + 1}</S.RankNum>
          {post.tagimage && (
            <S.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.tagimage[0]}`} alt={`${post.id}`} />
          )}
          <S.PostTitle>{post.title}</S.PostTitle>
        </S.ContentWrapper>
      ))}
    </S.ContentsArea>
  );
};

export default RealTimeCombo;
