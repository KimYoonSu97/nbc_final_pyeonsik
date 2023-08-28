import React from 'react';
import { useLocation } from 'react-router';
import { Post } from 'src/types/types';
import PostWriteCommon from 'src/components/post/PostWriteCommon';
import PostWriteRecipe from 'src/components/post/PostWriteRecipe';

const Write = () => {
  const location = useLocation();
  const orgPost = location.state as Post;
  console.log(location);

  return (
    <div>
      <PostWriteCommon orgPostId={orgPost?.id} orgUserId={orgPost?.userId?.id} />
      {orgPost && (
        <div>
          인용 게시글
          <div>{orgPost.title}</div>
          <div>{orgPost.body}</div>
          <div>{orgPost.userId?.nickname}</div>
          <div>{orgPost.created_at}</div>
        </div>
      )}
      {/* <PostWriteRecipe orgPostId={orgPost?.id} orgUserId={orgPost?.userId?.id} /> */}
    </div>
  );
};

export default Write;
