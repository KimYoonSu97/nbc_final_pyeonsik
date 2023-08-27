import React from 'react';
import Comment from 'src/components/Detail/comments/Comment';
import PostDetailCommon from 'src/components/post/PostDetailCommon';
import PostDetailRecipe from 'src/components/post/PostDetailRecipe';

const Detail = () => {
  return (
    <div>
      <PostDetailCommon />
      {/* <PostDetailRecipe /> */}
      <Comment />
    </div>
  );
};

export default Detail;
