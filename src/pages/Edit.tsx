import React from 'react';
import { useLocation } from 'react-router';
import PostEditCommon from 'src/components/post/PostEditCommon';
import PostEditRecipe from 'src/components/post/PostEditRecipe';
import { S } from './Write';

const Edit = () => {
  const location = useLocation();
  const category = location.state?.postCategory;

  return (
    <S.ViewPort>
      <S.WriteArea>
        {category === 'common' && <PostEditCommon />}
        {category === 'recipe' && <PostEditRecipe />}
      </S.WriteArea>
    </S.ViewPort>
  );
};

export default Edit;
