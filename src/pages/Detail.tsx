import React from 'react';
import Comment from 'src/components/Detail/comments/Comment';
import PostDetailCommon from 'src/components/post/PostDetailCommon';

const Detail = () => {
  return (
    <div>
      <PostDetailCommon />
      <Comment />
    </div>
  );
};

export default Detail;
