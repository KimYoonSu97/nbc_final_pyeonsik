import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Post } from 'src/types/types';
import PostWriteCommon from 'src/components/post/write/PostWriteCommon';
import PostWriteRecipe from 'src/components/post/write/PostWriteRecipe';
import OrgPostCard from 'src/components/post/detail/OrgPostCard';
import styled from 'styled-components';

const Write = () => {
  const [category, setCategory] = useState<string>('common');

  const location = useLocation();
  const orgPost = location.state as Post;
  const orgUserNickname = orgPost?.userId?.nickname;

  return (
    <S.ViewPort>
      <S.WrtieArea>
        {category === 'common' && <PostWriteCommon orgPostId={orgPost?.id} setCategory={setCategory} />}
        {orgPost && <OrgPostCard orgPost={orgPost} orgUserNickname={orgUserNickname} />}
        {category === 'recipe' && <PostWriteRecipe orgPostId={orgPost?.id} setCategory={setCategory} />}
      </S.WrtieArea>
    </S.ViewPort>
  );
};

export default Write;

export const S = {
  ViewPort: styled.div`
    width: 100vw;
    height: 100vh;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: hidden;
  `,
  WrtieArea: styled.div`
    background-color: #f6f7f9;
    width: 100%;
    min-height: 100%;
  `
};
