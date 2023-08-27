import React from 'react';
import PostWriteCommon from 'src/components/post/PostWriteCommon';
import PostWriteRecipe from 'src/components/post/PostWriteRecipe';

const Write = () => {
  // orign post
  const orgPost = {
    id: 'b3b81565-a1c0-42dd-b7c2-dfd3fac605b5',
    created_at: '2023-08-26 20:21:42.020196+00',
    title: '인용할 거에요',
    body: <p>이거슨 어찌될 건가</p>,
    userId: { id: 'e26ae273-7e52-47f7-8f74-0740097ba336', nickname: '123' }
  };

  return (
    <div>
      <PostWriteCommon orgPostId={orgPost.id} orgUserId={orgPost.userId.id} />
      {/* component 분리 필요 */}
      {orgPost && (
        <div>
          인용 게시글
          <div>{orgPost.title}</div>
          <div>{orgPost.body}</div>
          <div>{orgPost.userId.nickname}</div>
          <div>{orgPost.created_at}</div>
        </div>
      )}
      {/* component 분리 필요 */}
      <PostWriteRecipe orgPostId={orgPost.id} orgUserId={orgPost.userId.id} />
    </div>
  );
};

export default Write;
