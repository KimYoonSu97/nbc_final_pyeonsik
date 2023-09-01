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

  return (
    <S.ViewPort>
      <S.WriteArea>
        {category === 'common' && <PostWriteCommon orgPostId={orgPost?.id} setCategory={setCategory} />}
        {orgPost && <OrgPostCard orgPost={orgPost} />}
        {category === 'recipe' && <PostWriteRecipe orgPostId={orgPost?.id} setCategory={setCategory} />}
      </S.WriteArea>
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
  WriteArea: styled.div`
    background-color: #f6f7f9;
    width: 100%;
    min-height: 100%;
  `
};
